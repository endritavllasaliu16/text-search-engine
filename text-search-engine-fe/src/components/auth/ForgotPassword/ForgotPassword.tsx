import React, { useState } from "react";
import { Link } from "react-router-dom";

import SocialMedia from "../../Layout/SocialMedia";
import withAuthRedirect from "../AuthRedirectHOC";
import "./ForgotPassword.css";

interface ForgotPasswordProps {}

const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
	const [credentials, setCredentials] = useState({
		email: "",
	});

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setCredentials((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// Handle login logic here
		console.log(credentials);
	};

	return (
		<>
			<h1 className='app-title'>Text search engine</h1>
			<div className='form-container'>
				<p className='title'>Forgot password</p>
				<form className='form' onSubmit={handleSubmit}>
					<div className='input-group'>
						<label htmlFor='username'>Email</label>
						<input
							type='email'
							name='email'
							id='email'
							placeholder=''
							value={credentials.email}
							onChange={handleInputChange}
						/>
					</div>
					<br />
					<button className='sign' type='submit'>
						Request reset password
					</button>
				</form>
				<div className='social-message'>
					<div className='line'></div>
					<p className='message'>Login with social accounts</p>
					<div className='line'></div>
				</div>
				<SocialMedia />
				<p className='signup'>
					Don't have an account?{" "}
					<Link to='/register' className=''>
						Register
					</Link>
				</p>
			</div>
		</>
	);
};

const AuthRedirectedForgotPassword = withAuthRedirect(ForgotPassword);

export default AuthRedirectedForgotPassword;

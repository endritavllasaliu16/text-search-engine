import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import SocialMedia from "../../Layout/SocialMedia";
import withAuthRedirect from "../AuthRedirectHOC";
import "./Login.css";
import { useAuth } from "../../../context/AuthContext";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const { login } = useAuth();
	const navigate = useNavigate();

	const onSubmit = async (data: any) => {
		try {
			await login(data.email, data.password);
			navigate("/dashboard");
		} catch (error) {
			console.error("Error during login:", error);
		}
	};

	return (
		<>
			<h1 className='app-title'>Text search engine</h1>
			<div className='form-container'>
				<p className='title'>Login</p>
				<form className='form' onSubmit={handleSubmit(onSubmit)}>
					<div className='input-group'>
						<label htmlFor='email'>Email</label>
						<input
							{...register("email", {
								required: "Email is required",
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
									message: "Invalid email address",
								},
							})}
							type='text'
							name='email'
							id='email'
							placeholder=''
						/>
						{errors.email && (
							<span>{errors.email.message as string}</span>
						)}
					</div>
					<div className='input-group'>
						<label htmlFor='password'>Password</label>
						<input
							{...register("password", {
								required: "Password is required",
							})}
							type='password'
							name='password'
							id='password'
							placeholder=''
						/>
						{errors.password && (
							<span>{errors.password.message as string}</span>
						)}
						<div className='forgot'>
							<Link to='/forgot-password'>Forgot Password ?</Link>
						</div>
					</div>
					<button className='sign' type='submit'>
						Log in
					</button>
				</form>
				<div className='social-message'>
					<div className='line'></div>
					<p className='message'>Login with social accounts</p>
					<div className='line'></div>
				</div>
				<SocialMedia />
				<p className='signup'>
					Don't have an account? <Link to='/register'>Sign up</Link>
				</p>
			</div>
		</>
	);
};

const AuthRedirectedLogin = withAuthRedirect(Login);

export default AuthRedirectedLogin;

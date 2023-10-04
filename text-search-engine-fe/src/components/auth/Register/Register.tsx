import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../context/AuthContext"; // Ensure you've imported this

import SocialMedia from "../../Layout/SocialMedia";
import withAuthRedirect from "../AuthRedirectHOC";
import "./Register.css";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
	const { register: authRegister } = useAuth();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm();

	const onSubmit = async (data: any) => {
		const { name, email, password, confirmPassword } = data;

		if (password !== confirmPassword) {
			setError("confirmPassword", {
				type: "manual",
				message: "Passwords do not match",
			});
			return;
		}

		try {
			await authRegister(name, email, password);
			navigate("/dashboard");
		} catch (error) {
			console.error("Error during registration:", error);
		}
	};

	return (
		<>
			<h1 className='app-title'>Text search engine</h1>
			<div className='register-form-container'>
				<p className='title'>Register</p>
				<form className='form' onSubmit={handleSubmit(onSubmit)}>
					<div className='input-group'>
						<label htmlFor='name'>Full Name</label>
						<input
							{...register("name", {
								required: "Name is required",
							})}
							type='text'
							name='name'
							id='name'
						/>
						{errors.name && (
							<span>{errors.name.message as string}</span>
						)}
					</div>
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
						/>
						{errors.password && (
							<span>{errors.password.message as string}</span>
						)}

						<label htmlFor='confirmPassword'>
							Confirm Password
						</label>
						<input
							type='password'
							id='confirmPassword'
							{...register("confirmPassword")}
						/>
						{errors.confirmPassword && (
							<span>
								{errors.confirmPassword.message as string}
							</span>
						)}
					</div>
					<br />
					<button className='sign' type='submit'>
						Register
					</button>
				</form>
				<div className='social-message'>
					<div className='line'></div>
					<p className='message'>Register with social accounts</p>
					<div className='line'></div>
				</div>
				<SocialMedia />
				<p className='signup'>
					Have an account? <Link to='/login'>Log in</Link>
				</p>
			</div>
		</>
	);
};

const AuthRedirectedRegister = withAuthRedirect(Register);
export default AuthRedirectedRegister;

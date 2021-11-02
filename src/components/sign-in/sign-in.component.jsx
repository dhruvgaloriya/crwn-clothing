import React, { useState } from "react";
import { useDispatch } from "react-redux";
import FormInput from "../../comman-components/form-input/form-input.component";
import CustomButton from "../../comman-components/custom-button/custom-button.component";
import "./sign-in.styles.scss";
import {
	googleSignInStart,
	emailSignInStart,
} from "../../redux/user/user.action";

const SignIn = () => {
	const dispatch = useDispatch();
	const emailSignIn = () => dispatch(emailSignInStart());
	const googleSignIn = () => dispatch(googleSignInStart());

	const [userCreds, setCreds] = useState({ email: "", password: "" });
	const { email, password } = userCreds;

	const handleSubmit = (event) => {
		event.preventDefault();
		emailSignIn(email, password);
	};

	const handleChange = (event) => {
		const { value, name } = event.target;
		setCreds({ ...userCreds, [name]: value });
	};

	return (
		<div className="sign-in">
			<h2>I already have an account</h2>
			<span>Sign in with your email and password</span>

			<form onSubmit={handleSubmit}>
				<FormInput
					name="email"
					type="email"
					handleChange={handleChange}
					value={email}
					label="email"
					required
				/>
				<FormInput
					name="password"
					type="password"
					value={password}
					handleChange={handleChange}
					label="password"
					required
				/>
				<div className="buttons">
					<CustomButton type="submit"> Sign in </CustomButton>
					<CustomButton
						isGoogleSignIn
						type="button"
						onClick={googleSignIn}
					>
						Sign in with Google
					</CustomButton>
				</div>
			</form>
		</div>
	);
};

export default SignIn;

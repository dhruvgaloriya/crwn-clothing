import React from "react";

import FormInput from "../../comman-components/form-input/form-input.component";
import CustomButton from "../../comman-components/custom-button/custom-button.component";
import "./sign-in.styles.scss";
import {
	googleSignInStart,
	emailSignInStart,
} from "../../redux/user/user.action";
import { connect } from "react-redux";

class SignIn extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
		};
	}

	handleSubmit = (event) => {
		event.preventDefault();
		const { emailSignInStart } = this.props;
		const { email, password } = this.state;
		emailSignInStart(email, password);
		//this.setState({ email: "", password: "" });
	};

	handleChange = (event) => {
		const { value, name } = event.target;
		this.setState({ [name]: value });
	};

	render() {
		const { googleSignInStart } = this.props;
		return (
			<div className="sign-in">
				<h2>I already have an account</h2>
				<span>Sign in with your email and password</span>

				<form onSubmit={this.handleSubmit}>
					<FormInput
						name="email"
						type="email"
						handleChange={this.handleChange}
						value={this.state.email}
						label="email"
						required
					/>
					<FormInput
						name="password"
						type="password"
						value={this.state.password}
						handleChange={this.handleChange}
						label="password"
						required
					/>
					<div className="buttons">
						<CustomButton type="submit"> Sign in </CustomButton>
						<CustomButton
							isGoogleSignIn
							type="button"
							onClick={googleSignInStart}
						>
							Sign in with Google
						</CustomButton>
					</div>
				</form>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	googleSignInStart: () => dispatch(googleSignInStart()),
	emailSignInStart: (email, password) =>
		dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);

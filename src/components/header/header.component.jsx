import React from "react";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import { connect } from "react-redux";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { signOutStart } from "../../redux/user/user.action";
import {
	HeaderContainer,
	OptionsContainer,
	LogoContainer,
	OptionLink,
} from "./header.styles";

const Header = ({ currentUser, hidden, signOutStart }) => (
	<HeaderContainer>
		<LogoContainer to="/">
			<Logo />
		</LogoContainer>
		<OptionsContainer>
			{currentUser ? (
				<OptionLink as="span">
					WELCOME <b>{currentUser.displayName}</b>
				</OptionLink>
			) : null}

			<OptionLink to="/shop">SHOP</OptionLink>
			<OptionLink to="/shop">CONTACT</OptionLink>
			{currentUser ? (
				<OptionLink as="div" onClick={signOutStart}>
					SIGN OUT
				</OptionLink>
			) : (
				<OptionLink to="/sign-in">SIGN IN</OptionLink>
			)}
			<CartIcon />
		</OptionsContainer>
		{!hidden ? <CartDropdown /> : null}
	</HeaderContainer>
);

const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
	currentUser,
	hidden,
});

const mapDispatchToProps = (dispatch) => ({
	signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

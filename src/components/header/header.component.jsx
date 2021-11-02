import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { signOutStart } from "../../redux/user/user.action";
import {
	HeaderContainer,
	OptionsContainer,
	LogoContainer,
	OptionLink,
} from "./header.styles";

const Header = () => {
	const currentUser = useSelector((state) => state.user.currentUser);
	const hidden = useSelector((state) => state.cart.hidden);
	const dispatch = useDispatch();
	const signOut = () => dispatch(signOutStart());
	return (
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
					<OptionLink as="div" onClick={signOut}>
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
};

export default Header;

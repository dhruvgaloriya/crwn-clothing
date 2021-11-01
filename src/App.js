import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import "./App.css";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { setCurrentUser, checkUserSession } from "./redux/user/user.action";
import CheckoutPage from "./pages/checkout/checkout.component";
import { selectCurrentUser } from "./redux/user/user.selector";
const App = ({ currentUser, checkUserSession }) => {
	//unsubscribeFromAuth = null;

	useEffect(() => {
		checkUserSession();
		return () => {
			console.log("cleanup function");
		};
	}, [checkUserSession]);
	return (
		<>
			<Header />
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route path="/shop" component={ShopPage} />
				<Route exact path="/checkout" component={CheckoutPage} />
				<Route
					path="/sign-in"
					render={() =>
						currentUser ? (
							<Redirect to="/" />
						) : (
							<SignInAndSignUpPage />
						)
					}
				/>
			</Switch>
		</>
	);
};

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
	setCurrentUser: (user) => dispatch(setCurrentUser(user)),
	checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { useDispatch, useSelector } from "react-redux";
import { checkUserSession } from "./redux/user/user.action";
import CheckoutPage from "./pages/checkout/checkout.component";
import { selectCurrentUser } from "./redux/user/user.selector";
import "./App.css";

const App = () => {
	const currentUser = useSelector(selectCurrentUser);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(checkUserSession());
		return () => {
			console.log("cleanup function	");
		};
	}, [dispatch]);
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

export default App;

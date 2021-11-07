import React, { lazy, useEffect, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkUserSession } from "./redux/user/user.action";
import { selectCurrentUser } from "./redux/user/user.selector";
import Header from "./components/header/header.component";
import Spinner from "./comman-components/spinner/spinner.comopnent";
import "./App.css";

const HomePage = lazy(() => import("./pages/homepage/homepage.component"));
const ShopPage = lazy(() => import("./pages/shop/shop.component"));
const SignInAndSignUpPage = lazy(() =>
	import("./pages/sign-in-and-sign-up/sign-in-and-sign-up.component")
);
const CheckoutPage = lazy(() => import("./pages/checkout/checkout.component"));

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
				<Suspense fallback={<Spinner />}>
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
				</Suspense>
			</Switch>
		</>
	);
};

export default App;

import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import CollectionOverviewContainer from "../../components/collections-overview/collection-overview.container";
import CollectionPageConatiner from "../collection/collection.container";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";

const ShopPage = ({ fetchCollection, match }) => {
	useEffect(() => {
		fetchCollection();
		return () => {
			console.log("ok done");
		};
	}, [fetchCollection]);

	return (
		<div className="shop-page">
			<Route
				exact
				path={`${match.path}`}
				component={CollectionOverviewContainer}
			/>
			<Route
				path={`${match.path}/:collectionId`}
				component={CollectionPageConatiner}
			/>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	fetchCollection: () => dispatch(fetchCollectionsStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);

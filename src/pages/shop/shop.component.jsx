import React, { useEffect, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import Spinner from "../../comman-components/spinner/spinner.comopnent";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";

const CollectionOverviewContainer = lazy(() =>
	import(
		"../../components/collections-overview/collection-overview.container"
	)
);
const CollectionPageConatiner = lazy(() =>
	import("../collection/collection.container")
);

const ShopPage = ({ fetchCollection, match }) => {
	useEffect(() => {
		fetchCollection();
		return () => {
			console.log("ok done");
		};
	}, [fetchCollection]);

	return (
		<div className="shop-page">
			<Suspense fallback={<Spinner />}>
				<Route
					exact
					path={`${match.path}`}
					component={CollectionOverviewContainer}
				/>
				<Route
					path={`${match.path}/:collectionId`}
					component={CollectionPageConatiner}
				/>
			</Suspense>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	fetchCollection: () => dispatch(fetchCollectionsStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);

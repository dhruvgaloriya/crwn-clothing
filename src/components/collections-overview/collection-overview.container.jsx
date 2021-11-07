import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import withSpinner from "../../comman-components/with-spinner/with-spinner.component";
import { selectIsCollectionFetching } from "../../redux/shop/shop.selector";
import CollectionsOverviewComponent from "./collections-overview.component";

const mapStateToProps = createStructuredSelector({
	isLoading: selectIsCollectionFetching,
});

const CollectionOverviewContainer = connect(mapStateToProps)(
	withSpinner(CollectionsOverviewComponent)
);

export default CollectionOverviewContainer;

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import withSpinner from "../../comman-components/with-spinner/with-spinner.styles";
import { selectIsCollectionFetching } from "../../redux/shop/shop.selector";
import CollectionPage from "./collection.component";
const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching,
});
const CollectionPageConatiner = connect(mapStateToProps)(
  withSpinner(CollectionPage)
);
export default CollectionPageConatiner;

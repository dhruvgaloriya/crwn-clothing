import { createSelector } from "reselect";

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectCollectionForOverview = createSelector(
  [selectCollections],
  (collection) =>
    collection ? Object.keys(collection).map((item) => collection[item]) : []
);

export const selectCollection = (name) =>
  createSelector([selectCollections], (collection) =>
    collection ? collection[name] : null
  );

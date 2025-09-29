import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ProductsState} from "./products.reducer";
import {sumProducts} from "../../utils/sum-products";

export const selectProductsState = createFeatureSelector<ProductsState>('products');

export const selectProducts = createSelector(
  selectProductsState,
  (productsState) => productsState.products
)

export const selectProductsLoading = createSelector(
  selectProductsState,
  (productsState) => productsState.loading
)

export const selectProductsShowProductCode = createSelector(
  selectProductsState,
  (productsState) => productsState.showProductCode
)

export const selectProductsTotal = createSelector(
  selectProducts,
  (products) => sumProducts(products)
)

export const selectProductsErrorMessage = createSelector(
  selectProductsState,
  (productsState) => productsState.errorMessage
)

import {createAction, createReducer, on} from "@ngrx/store";
import {ProductsApiActions, ProductsPageActions} from "./products.actions";
import {Product} from "../product.model";

export interface ProductsState {
  showProductCode: boolean;
  loading: boolean;
  products: Product[];
  errorMessage: string;
}

const initialState: ProductsState = {
  showProductCode: false,
  loading: false,
  products: [],
  errorMessage: ''
};

export const productsReducer = createReducer(
  initialState,
  on(ProductsPageActions.toggleShowProductCode, (state) => ({
      ...state,
      showProductCode: !state.showProductCode
    })),
  on(ProductsPageActions.loadProducts, (state) => ({
    ...state,
    loading: true,
    errorMessage: ''
  })),
  on(ProductsApiActions.productsLoadedSuccess, (state, {products}) => ({
    ...state,
    loading: false,
    products
  })),
  on(ProductsApiActions.productsLoadFail, (state, {message}) => ({
    ...state,
    products: [],
    errorMessage: message,
    loading: false
    }))
  )

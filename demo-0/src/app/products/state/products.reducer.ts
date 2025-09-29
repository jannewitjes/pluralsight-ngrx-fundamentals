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
    })),
  on(ProductsPageActions.addProduct, (state) => ({
    ...state,
    loading: true,
    errorMessage: ''
  })),
  on(ProductsApiActions.productsAddedSuccess, (state, {product}) => ({
    ...state,
    loading: false,
    products: [...state.products, product]
  })),
  on(ProductsApiActions.productsAddedFail, (state, {message}) => ({
    ...state,
    loading: false,
    errorMessage: message
  })),
  on(ProductsPageActions.updateProduct, (state) => ({
    ...state,
    loading: true,
    errorMessage: ''
  })),
  on(ProductsApiActions.productsUpdatedSuccess, (state, {product}) => ({
    ...state,
    loading: false,
    products: state.products.map((existingProduct) =>
    existingProduct.id === product.id ? product : existingProduct)
  })),
  on(ProductsApiActions.productsUpdatedFail, (state, {message}) => ({
    ...state,
    loading: false,
    errorMessage: message
  })),
  on(ProductsPageActions.deleteProduct, (state) => ({
    ...state,
    loading: true,
    errorMessage: ''
  })),
  on(ProductsApiActions.productsDeletedSuccess, (state, {id}) => ({
    ...state,
    loading: false,
    products: state.products.filter((existingProduct) => existingProduct.id !== id)
  })),
  on(ProductsApiActions.productsDeletedFail, (state, {message}) => ({
    ...state,
    loading: false,
    errorMessage: message
  })),
  )

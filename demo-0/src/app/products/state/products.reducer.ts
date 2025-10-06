import {createAction, createReducer, on} from "@ngrx/store";
import {ProductsApiActions, ProductsPageActions} from "./products.actions";
import {Product} from "../product.model";
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";

export interface ProductsState extends EntityState<Product> {
  showProductCode: boolean;
  loading: boolean;
  errorMessage: string;
}

const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({});

const initialState: ProductsState = adapter.getInitialState({
  showProductCode: false,
  loading: false,
  errorMessage: '',
});

export const productsReducer = createReducer(
  initialState,
  on(ProductsPageActions.toggleShowProductCode, (state) => ({
      ...state,
      showProductCode: !state.showProductCode
    })),
  on(ProductsPageActions.loadProducts, (state) =>
    adapter.setAll([], {
    ...state,
    loading: true,
    errorMessage: ''
  })),
  on(ProductsApiActions.productsLoadedSuccess, (state, {products}) =>
    adapter.setAll(products, {
    ...state,
    loading: false
  })),
  on(ProductsApiActions.productsLoadFail, (state, {message}) =>
    adapter.setAll([], {
    ...state,
    errorMessage: message,
    loading: false
    })),
  on(ProductsPageActions.addProduct, (state) => ({
    ...state,
    loading: true,
    errorMessage: ''
  })),
  on(ProductsApiActions.productsAddedSuccess, (state, {product}) =>
    adapter.addOne(product, {
    ...state,
    loading: false,
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
  on(ProductsApiActions.productsUpdatedSuccess, (state, {update}) =>
    adapter.updateOne(update, {
    ...state,
    loading: false,
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
  on(ProductsApiActions.productsDeletedSuccess, (state, {id}) =>
    adapter.removeOne(id, {
    ...state,
    loading: false,
  })),
  on(ProductsApiActions.productsDeletedFail, (state, {message}) => ({
    ...state,
    loading: false,
    errorMessage: message
  })),
  )

const { selectAll, selectEntities } = adapter.getSelectors();

export const selectProductEntities = selectEntities;
export const selectProducts = selectAll;

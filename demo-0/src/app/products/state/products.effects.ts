import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ProductsService} from "../products.service";
import {ProductsApiActions, ProductsPageActions} from "./products.actions";
import {catchError, concatMap, exhaustMap, map, mergeMap, of} from "rxjs";

@Injectable()
export class ProductEffects {
  constructor(private actions$: Actions, private productsService: ProductsService) {
  }

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.loadProducts),
      exhaustMap(() =>
        this.productsService
          .getAll()
          .pipe(
            map((products) =>
              ProductsApiActions.productsLoadedSuccess({ products })
            ),
            catchError((error) => of(ProductsApiActions.productsLoadFail({ message: error})))
          )
      )
    )
  );

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.addProduct),
      mergeMap(({product}) =>
        this.productsService
          .add(product)
          .pipe(
            map((newProduct) =>
              ProductsApiActions.productsAddedSuccess({ product: newProduct })
            ),
            catchError((error) => of(ProductsApiActions.productsAddedFail({ message: error})))
          )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.updateProduct),
      concatMap(({product}) =>
        this.productsService
          .update(product)
          .pipe(
            map((newProduct) =>
              ProductsApiActions.productsUpdatedSuccess({ product: newProduct })
            ),
            catchError((error) => of(ProductsApiActions.productsUpdatedFail({ message: error})))
          )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.deleteProduct),
      mergeMap(({id}) =>
        this.productsService
          .delete(id)
          .pipe(
            map((newProduct) =>
              ProductsApiActions.productsDeletedSuccess({ id })
            ),
            catchError((error) => of(ProductsApiActions.productsDeletedFail({ message: error})))
          )
      )
    )
  );

}

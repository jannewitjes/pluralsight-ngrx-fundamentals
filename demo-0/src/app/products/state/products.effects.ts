import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ProductsService} from "../products.service";
import {ProductsApiActions, ProductsPageActions} from "./products.actions";
import {concatMap, map} from "rxjs";

@Injectable()
export class ProductEffects {
  constructor(private actions$: Actions, private productsService: ProductsService) {
  }

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.loadProducts),
      concatMap(() =>
        this.productsService
          .getAll()
          .pipe(
            map((products) =>
              ProductsApiActions.productsLoadedSuccess({ products })
            )
          )
      )
    )
  );

}

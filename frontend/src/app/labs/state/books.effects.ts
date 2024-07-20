import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BookItem, BooksDataService } from '../services/books.service';
import { BookActions } from './books.actions';
import { map, switchMap, tap } from 'rxjs';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { BooksFeature } from './books.feature';
import createFuzzySearch, { FuzzySearcher } from '@nozbe/microfuzz';

@Injectable({ providedIn: 'root' })
export class BooksEffects {
  #actions$ = inject(Actions);
  #service = inject(BooksDataService);
  #store = inject(Store);
  #fuzzySearch!: FuzzySearcher<BookItem>;

  #cachedUnFiltered: BookItem[] = [];
  loadBooks$ = createEffect(() => {
    return this.#actions$.pipe(
      ofType(BookActions.loadTheBooks),
      switchMap(() =>
        this.#service.getBooks().pipe(
          tap(payload => (this.#cachedUnFiltered = payload)),
          tap(
            payload =>
              (this.#fuzzySearch = createFuzzySearch(payload, {
                getText: item => [
                  item.title,
                  item.author,
                  item.year.toString(),
                ],
              }))
          ),
          map(payload => BookActions.books({ payload }))
        )
      )
    );
  });

  filterBooks$ = createEffect(
    () => {
      return this.#actions$.pipe(
        ofType(BookActions.setFilter),
        concatLatestFrom(() => this.#store.select(BooksFeature.selectBooks)),
        map(([{ payload }, b]) => {
          const searchTerm = payload.trim();
          if (!searchTerm) {
            return BookActions.books({ payload: this.#cachedUnFiltered });
          }
          const results = this.#fuzzySearch(searchTerm);

          return BookActions.books({
            payload: results.map(r => r.item),
          });
        })
      );
    },
    { dispatch: true }
  );
  clearFilter$ = createEffect(() => {
    return this.#actions$.pipe(
      ofType(BookActions.clearFilter),
      map(() => BookActions.books({ payload: this.#cachedUnFiltered }))
    );
  });
}

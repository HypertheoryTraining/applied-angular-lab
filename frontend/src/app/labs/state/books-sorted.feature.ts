import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { BooksPagedFeature } from './books-paged.feature';
import { BookSortingActions } from './books-sorted.actions';
import { BookSortDirection, BookSortkey } from './books.feature';

export type BooksSortedState = {
  filter: BookSortkey;
  direction: BookSortDirection;
};

const initialState: BooksSortedState = {
  filter: 'id',
  direction: 'asc',
};

const BooksSortedFeature = createFeature({
  name: 'Books Sorted Feature',
  reducer: createReducer(
    initialState,
    on(BookSortingActions.setSort, (_, a) => a.payload)
  ),
  extraSelectors: ({ selectFilter, selectDirection }) => {
    const _selectFilteredBooks = createSelector(
      selectFilter,
      selectDirection,
      BooksPagedFeature.selectPagedBooks,
      (filter, direction, books) => {
        return books.toSorted((booka, bookb) => {
          let a: number | string;
          let b: number | string;
          if (typeof filter === 'number') {
            a = booka[filter];
            b = bookb[filter];
          } else {
            a = booka[filter].toLocaleString();
            b = bookb[filter].toLocaleString();
          }
          if (direction === 'desc') {
            [a, b] = [b, a];
          }
          return a.localeCompare(b);
        });
        // const comparer = (a: string | number, b: string | number): number => {
        //   if (direction === 'asc') {
        //     [a, b] = [b, a];
        //   }
        //   if (filter === 'id' || filter == 'year') {
        //     return +a === +b ? 0 : a < b ? -1 : 1;
        //   } else {
        //     return a.toLocaleString().localeCompare(b.toLocaleString());
        //   }
        // };
        // return books.toSorted((l, r) => );
      }
    );
    return {
      selectFilteredBooks: _selectFilteredBooks,
    };
  },
});

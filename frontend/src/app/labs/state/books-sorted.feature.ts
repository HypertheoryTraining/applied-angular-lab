import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { BookSortingActions } from './books-sorted.actions';
import { BooksFeature, BookSortDirection, BookSortkey } from './books.feature';
import { BooksPagedFeature } from './books-paged.feature';

export type BooksSortedState = {
  filter: BookSortkey;
  direction: BookSortDirection;
};

const initialState: BooksSortedState = {
  filter: 'id',
  direction: 'asc',
};

export const BooksSortedFeature = createFeature({
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
        const comparer = (a: string | number, b: string | number): number => {
          if (direction === 'asc') {
            [a, b] = [b, a];
          }
          if (filter === 'id' || filter == 'year') {
            return +a === +b ? 0 : a < b ? -1 : 1;
          } else {
            return a.toLocaleString().localeCompare(b.toLocaleString());
          }
        };
        return books.toSorted((l, r) => comparer());
      }
    );
    return {
      selectFilteredBooks: _selectFilteredBooks,
    };
  },
});

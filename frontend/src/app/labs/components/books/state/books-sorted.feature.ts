import { createFeature, createReducer, createSelector } from '@ngrx/store';
import { BooksSourceFeature } from '../../../state/books/books-source/books-source.feature';
import { BookItem } from '../../../services/books.service';

export type BookKeys = keyof BookItem;
export type SortDirection = 'asc' | 'desc';

type BookSortedState = {
  sortingBy: BookKeys;
  direction: SortDirection;
};

const initialState: BookSortedState = {
  sortingBy: 'id',
  direction: 'asc',
};

const NUMERIC_KEYS: BookKeys[] = ['id', 'year'] as const;
export const BooksSortedFeature = createFeature({
  name: '[Books] Sorted Books',
  reducer: createReducer(initialState),
  extraSelectors: ({ selectSortingBy, selectDirection }) => {
    const _selectSortedBooks = createSelector(
      selectSortingBy,
      selectDirection,
      BooksSourceFeature.selectRawBooks,
      (by, direction, books) => {
        return books.toSorted((a, b) => {
          return getComparer(a, b, by, direction, ...NUMERIC_KEYS);
        });
      }
    );

    return {
      selectSortedBooks: _selectSortedBooks,
    };
  },
});

function getComparer(
  a: BookItem,
  b: BookItem,
  key: BookKeys,
  direction: SortDirection,
  ...numericKeys: BookKeys[]
) {
  [a, b] = direction === 'asc' ? [a, b] : [b, a];
  if (numericKeys.some(k => k === key)) {
    const aNumber = +a[key];
    const bNumber = +b[key];
    return aNumber == bNumber ? 0 : aNumber > bNumber ? 1 : -1;
  } else {
    return a[key].toLocaleString().localeCompare(b[key].toLocaleString());
  }
}

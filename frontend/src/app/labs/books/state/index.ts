import { createSelector } from '@ngrx/store';
import { BookKeys } from '../components/list/state';
import {
  BooksSortedFeature,
  SortDirection,
} from '../components/list/state/books-sorted.feature';
import { BooksSourceFeature } from './books/books-source/books-source.feature';
import { BookItem } from './books/models';

const NUMERIC_KEYS: BookKeys[] = ['id', 'year'] as const;
export const selectSortedBooks = createSelector(
  BooksSortedFeature.selectSortingBy,
  BooksSortedFeature.selectDirection,
  BooksSourceFeature.selectRawBooks,
  (by, direction, books) => {
    return books.toSorted((a, b) => {
      return getComparer(a, b, by, direction, ...NUMERIC_KEYS);
    });
  }
);

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

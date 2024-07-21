import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { BooksSortedFeature } from './books-sorted.feature';
import { BooksPagedEvents } from './books-paged.actions';

const ALL_PAGE_SIZES = ['all', 50, 25, 15, 10, 5] as const;

export type BooksPageSize = (typeof ALL_PAGE_SIZES)[number];

type BooksPagedState = { pageSize: BooksPageSize; currentPage: number };

const initialState: BooksPagedState = { pageSize: 15, currentPage: 0 };

export const BooksPagedFeature = createFeature({
  name: '[Books] Paged Books',
  reducer: createReducer(
    initialState,
    on(BooksPagedEvents.pageSizeSetTo, (s, { payload }) => ({
      ...s,
      pageSize: payload,
    }))
  ),
  extraSelectors: ({ selectCurrentPage, selectPageSize }) => {
    const selectPagedBooks = createSelector(
      BooksSortedFeature.selectSortedBooks,
      selectCurrentPage,
      selectPageSize,
      (books, currentPage, pageSize) => {
        switch (pageSize) {
          case 'all': {
            return books;
          }
          default:
            const startAt = currentPage * pageSize;
            const next = startAt + pageSize;
            return books.slice(startAt, next);
        }
      }
    );

    const selectPageSizeOptions = createSelector(selectPageSize, c =>
      ALL_PAGE_SIZES.map((p: BooksPageSize) => ({
        size: p as BooksPageSize,
        label: p.toString(),
        current: p === c,
      }))
        .toSorted((a, b) => getComparer(a, b, 'label', 'all'))
        .map(a => ({ ...a, label: a.label.toUpperCase() }))
    );
    return {
      selectPagedBooks,
      selectPageSizeOptions,
    };
  },
});

function getComparer<T>(
  a: T,
  b: T,
  key: keyof T,
  ...stringKeys: BooksPageSize[]
) {
  if (stringKeys.some(k => k === key)) {
    const aString = a[key] as string;
    const bString = a[key] as string;
    return bString.toLocaleString().localeCompare(aString.toLocaleString());
  } else {
    const aNumber = +a[key];
    const bNumber = +b[key];
    return aNumber == bNumber ? 0 : aNumber > bNumber ? 1 : -1;
  }
}

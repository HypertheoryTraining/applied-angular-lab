import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { BooksPagedEvents } from './books-paged.actions';
import { selectSortedBooks } from '../../state';
import { ALL_PAGE_SIZES, BooksPageSize } from '.';

type BooksPagedState = { pageSize: BooksPageSize; currentPage: number };

const initialState: BooksPagedState = { pageSize: 15, currentPage: 0 };

export const BooksPagedFeature = createFeature({
  name: '[Books] Paged Books',
  reducer: createReducer(
    initialState,
    on(BooksPagedEvents.pageSizeSetTo, (s, { payload }) => ({
      ...s,
      pageSize: payload,
    })),
    on(BooksPagedEvents.nextPageRequested, s => ({
      ...s,
      currentPage: s.currentPage + 1,
    })),
    on(BooksPagedEvents.previousPageRequested, s => ({
      ...s,
      currentPage: s.currentPage - 1,
    }))
  ),
  extraSelectors: ({ selectCurrentPage, selectPageSize }) => {
    const selectPagedBooks = createSelector(
      selectSortedBooks,
      selectCurrentPage,
      selectPageSize,
      (books, currentPage, pageSize) => {
        switch (pageSize) {
          case 'all': {
            return books;
          }
          default: {
            const startAt = currentPage * pageSize;
            const next = startAt + pageSize;
            return books.slice(startAt, next);
          }
        }
      }
    );

    const selectPageSummary = createSelector(
      selectCurrentPage,
      selectPageSize,
      selectSortedBooks,
      (current, size, { length }) => {
        let num: number = 1;
        if (size !== 'all') {
          num = Math.ceil(length / size);
        }
        return {
          current: current + 1,
          of: num,
        };
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
      selectPageSummary,
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

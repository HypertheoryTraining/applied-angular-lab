import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { BookItem } from '../services/books.service';
import { BookActions } from './books.actions';
export type BooksPageSize = 5 | 10 | 25 | 'all';
type BooksState = {
  books: BookItem[];
  pageSize: BooksPageSize;
  currentPage: number;
  numberOfBooks: number;
  _cachedSettings: {
    currentPage: number;
    pageSize: BooksPageSize;
  } | null;
};

const initialState: BooksState = {
  books: [],
  pageSize: 5,
  currentPage: 0,
  numberOfBooks: 0,
  _cachedSettings: null,
};

export const BooksFeature = createFeature({
  name: 'Books Feature',
  reducer: createReducer(
    initialState,
    on(BookActions.books, (s, a) => ({
      ...s,
      books: a.payload,
      numberOfBooks: a.payload.length,
    })),
    on(BookActions.setFilter, s => ({
      ...s,
      _cachedSettings: { currentPage: s.currentPage, pageSize: s.pageSize },
      currentPage: 0,
      pageSize: 'all' as unknown as BooksPageSize,
    })),
    on(BookActions.clearFilter, s => ({
      ...s,
      pageSize: s._cachedSettings?.pageSize || 'all',
      currentPage: s._cachedSettings?.currentPage || 0,
    })),
    on(BookActions.setPageSize, (s, a) => ({
      ...s,
      pageSize: a.payload,
      currentPage: 0, // when they change the page size, we always take them back to the first page. Good idea?
    })),
    on(BookActions.nextPage, s => ({ ...s, currentPage: s.currentPage + 1 })),
    on(BookActions.previousPage, s => ({
      ...s,
      currentPage: s.currentPage - 1,
    }))
  ),
  extraSelectors: ({
    selectBooks,
    selectPageSize,
    selectCurrentPage,
    selectNumberOfBooks,
  }) => ({
    selectPagedBooks: createSelector(
      selectBooks,
      selectPageSize,
      selectCurrentPage,
      (books, pageSize, currentPage) => {
        switch (pageSize) {
          case 'all':
            return books;
          default:
            const startAt = currentPage * pageSize;
            const next = startAt + pageSize;
            return books.slice(startAt, next);
        }
      }
    ),
    selectPreviousDisabled: createSelector(selectCurrentPage, p => p === 0),
    selectNextDisabled: createSelector(
      selectCurrentPage,
      selectPageSize,
      selectBooks,
      (currentPage, pageSize, { length }) => {
        if (pageSize === 'all') return true;
        return currentPage * pageSize + pageSize >= length;
      }
    ),
    selectPagerSummary: createSelector(
      selectCurrentPage,
      selectPageSize,
      selectBooks,
      selectNumberOfBooks,
      (currentPage, pageSize, { length }, count) => {
        if (pageSize === 'all') {
          return 1;
        }
        const totalPages = length / pageSize;
        return `Page ${currentPage + 1} of ${totalPages} (${count} books)`;
      }
    ),
  }),
});

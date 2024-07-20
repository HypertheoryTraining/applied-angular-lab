import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { BookItem } from '../services/books.service';
import { BookActions } from './books.actions';
export type BooksPageSize = 5 | 10 | 25 | 'all';
export type BookSortDirection = 'asc' | 'desc';
export type BookSortkey = keyof BookItem;
type BooksState = {
  books: BookItem[];
  pageSize: BooksPageSize;
  currentPage: number;
  numberOfBooks: number;
  sortingBy: BookSortkey;
  sortDirection: BookSortDirection;
  _cachedSettings: {
    currentPage: number;
    pageSize: BooksPageSize;
  } | null;
};

const initialState: BooksState = {
  books: [],
  pageSize: 5,
  sortingBy: 'id',
  currentPage: 0,
  numberOfBooks: 0,
  sortDirection: 'asc',
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
    on(BookActions.setSort, (s, a) => ({
      ...s,
      sortingBy: a.by,
      sortDirection: a.direction,
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
    selectSortingBy,
    selectSortDirection,
  }) => {
    const _selectSortedBooks = createSelector(
      selectBooks,
      selectSortingBy,
      selectSortDirection,
      (books, sortingkey, direction) =>
        books.toSorted((a, b) => {
          if (direction === 'desc') {
            const temp = a;
            a = b;
            b = temp;
          }
          return a[sortingkey]
            .toLocaleString()
            .localeCompare(b[sortingkey].toLocaleString());
        })
    );
    const selectPagedBooks = createSelector(
      _selectSortedBooks,
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
    );
    const selectPreviousDisabled = createSelector(
      selectCurrentPage,
      p => p === 0
    );
    const selectNextDisabled = createSelector(
      selectCurrentPage,
      selectPageSize,
      selectBooks,
      (currentPage, pageSize, { length }) => {
        if (pageSize === 'all') return true;
        return currentPage * pageSize + pageSize >= length;
      }
    );
    const selectPagerSummary = createSelector(
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
    );
    return {
      selectPageSize,
      selectCurrentPage,
      selectNextDisabled,
      selectPagedBooks,
      selectPagerSummary,
      selectPreviousDisabled,
      selectSortingBy,
      selectSortDirection,
    };
  },
});

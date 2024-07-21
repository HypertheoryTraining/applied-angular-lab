import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { BookItem } from '../services/books.service';
import { BookActions } from './books.actions';

export type BooksPageSize = 5 | 10 | 25 | 'all';
export type BookSortDirection = 'asc' | 'desc';
export type BookSortkey = keyof BookItem;

type BooksState = {
  books: BookItem[];
  filteredBooks: BookItem[];
  authorFilter: string | null;
  yearFilter: number | null;
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
  filteredBooks: [],
  pageSize: 5,
  sortingBy: 'id',
  authorFilter: null,
  yearFilter: null,
  currentPage: 0,
  numberOfBooks: 0,
  sortDirection: 'asc',
  _cachedSettings: null,
};

export const BooksFeature = createFeature({
  name: 'Books Feature',
  reducer: createReducer(
    initialState,
    on(BookActions.filterSubsetByAuthor, (s, a) => ({
      ...s,
      authorFilter: a.payload,
      yearFilter: null,
    })),
    on(BookActions.filterSubsetByYear, (s, a) => ({
      ...s,
      yearFilter: a.payload,
      authorFilter: null,
    })),
    on(BookActions.clearFilterSubset, s => ({
      ...s,
      yearFilter: null,
      authorFilter: null,
    })),
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
    selectAuthorFilter,
    selectYearFilter,
  }) => {
    const _selectSortedBooks = createSelector(
      selectBooks,
      selectSortingBy,
      selectSortDirection,
      (books, sortingkey, direction) => {
        const comparer = (a: string | number, b: string | number): number => {
          if (direction === 'desc') {
            [a, b] = Swap(a, b);
          }
          if (sortingkey === 'id' || sortingkey === 'year') {
            a = +a;
            b = +b;
            return a === b ? 0 : a < b ? -1 : 1;
          } else {
            return a.toLocaleString().localeCompare(b.toLocaleString());
          }
        };
        return books.toSorted((a, b) => {
          return comparer(a[sortingkey], b[sortingkey]);
        });
      }
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
    const selectFilteredSubset = createSelector(
      selectBooks,
      selectAuthorFilter,
      selectYearFilter,
      (books, author, year) => {
        if (author !== null) {
          return books.filter(b => b.author === author);
        }
        if (year !== null) {
          return books.filter(b => b.year === year);
        }
        return [];
      }
    );

    return {
      selectNextDisabled,
      selectPagedBooks,
      selectPagerSummary,
      selectPreviousDisabled,
      selectSortingBy,
      selectSortDirection,
      selectFilteredSubset,
      selectAuthorFilter,
      selectYearFilter,
    };
  },
});

function Swap<T>(a: T, b: T) {
  return [b, a];
}

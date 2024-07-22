import { createSelector, MemoizedSelector } from '@ngrx/store';
import { selectSortedBooks } from '../../state';
import { BooksPagedFeature } from './books-paged.feature';
import { BooksSourceFeature } from '../../state/books/books-source/books-source.feature';

export const ALL_PAGE_SIZES = ['all', 50, 25, 15, 10, 5] as const;

export type BooksPageSize = (typeof ALL_PAGE_SIZES)[number];
const selectBooks = createSelector(BooksSourceFeature.selectRawBooks, b => b);
type MemSel = typeof selectBooks;

const selectCurrentPageOfBooks = (books: MemSel) =>
  createSelector(
    books,
    BooksPagedFeature.selectCurrentPage,
    BooksPagedFeature.selectPageSize,
    (books, currentPage, pageSize) => {
      if (pageSize === 'all') {
        return books;
      } else {
        const startAt = currentPage * pageSize;
        const next = startAt + pageSize;
        return books.slice(startAt, next);
      }
    }
  );

// const createPagedBooks = (books:MemSel) =>
//   createSelector(
//     books,
//     BooksPagedFeature.
//   )

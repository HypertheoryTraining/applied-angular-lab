import { createFeature, createReducer, createSelector } from '@ngrx/store';
import { BooksFeature, BooksPageSize } from './books.feature';

type BooksPagedType = {
  pageSize: BooksPageSize;
  currentPage: number;
};

const initialState: BooksPagedType = {
  pageSize: 10,
  currentPage: 0,
};

export const BooksPagedFeature = createFeature({
  name: 'Books Paged Feature',
  reducer: createReducer(initialState),
  extraSelectors: ({ selectCurrentPage, selectPageSize }) => {
    const _selectPagedBooks = createSelector(
      BooksFeature.selectBooks,
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
    return {
      selectPagedBooks: _selectPagedBooks,
    };
  },
});

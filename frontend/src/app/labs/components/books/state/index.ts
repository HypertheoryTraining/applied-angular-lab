import { createSelector } from '@ngrx/store';
import { BooksPagedFeature } from './books-paged.feature';

export const BookListSelectors = {
  selectBookList: BooksPagedFeature.selectPagedBooks,
};

export const BookPagingSelectors = {
  selectPageSummary: BooksPagedFeature.selectPageSummary,
  selectPageNextAvailable: createSelector(
    BooksPagedFeature.selectPageSummary,
    s => s.current < s.of
  ),
};

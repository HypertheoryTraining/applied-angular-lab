import { createFeature, createReducer, createSelector } from '@ngrx/store';
import { BooksFeature } from './books.feature';

export type BookSummaryState = {};

const initialState: BookSummaryState = {};

export const BooksSummaryFeature = createFeature({
  name: 'Books Summary',
  reducer: createReducer(initialState),
  extraSelectors: () => {
    const selectBooks = createSelector(BooksFeature.selectBooks, b => b);
    return {
      selectBooks,
    };
  },
});

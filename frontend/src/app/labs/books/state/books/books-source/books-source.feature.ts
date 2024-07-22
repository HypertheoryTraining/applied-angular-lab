import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { BookItem } from '../models';
import { BooksSourceDocuments } from './books-source.actions';

type BookSourceState = {
  books: BookItem[];
};

const initialState: BookSourceState = {
  books: [],
};

export const BooksSourceFeature = createFeature({
  name: 'Books Source',
  reducer: createReducer(
    initialState,
    on(BooksSourceDocuments.books, (s, { payload: books }) => ({ ...s, books }))
  ),
  extraSelectors: ({ selectBooks }) => {
    const _selectRawBooks = createSelector(selectBooks, b => b);

    return {
      selectRawBooks: _selectRawBooks,
    };
  },
});

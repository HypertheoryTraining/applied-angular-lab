import { createFeature, createReducer, createSelector, on } from '@ngrx/store';

import { BookSortedEvents } from './books-sorted.actions';
import { BookItem } from '../../../state/books/models';

export type BookKeys = keyof BookItem;
export type SortDirection = 'asc' | 'desc';

export type BooksSortedState = {
  sortingBy: BookKeys;
  direction: SortDirection;
};

const initialState: BooksSortedState = {
  sortingBy: 'id',
  direction: 'asc',
};

export const BooksSortedFeature = createFeature({
  name: '[Books] Sorted Books',
  reducer: createReducer(
    initialState,
    on(BookSortedEvents.sortBySet, (s, { payload }) => payload)
  ),
});

import { createActionGroup, props } from '@ngrx/store';
import { BooksSortedState } from './books-sorted.feature';

export const BookSortedEvents = createActionGroup({
  source: 'Books Sorted Events',
  events: {
    'Sort By Set': props<{ payload: BooksSortedState }>(),
  },
});

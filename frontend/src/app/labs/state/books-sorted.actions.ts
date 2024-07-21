import { createActionGroup, props } from '@ngrx/store';
import { BooksSortedState } from './books-sorted.feature';

const BookSortingActions = createActionGroup({
  source: 'Books Sorting',
  events: {
    'Set Sort': props<{
      payload: BooksSortedState;
    }>(),
  },
});

import { createActionGroup, props } from '@ngrx/store';
import { BooksPageSize } from './books-paged.feature';

export const BooksPagedEvents = createActionGroup({
  source: 'Books Paged Events',
  events: {
    'Page Size Set To': props<{ payload: BooksPageSize }>(),
  },
});

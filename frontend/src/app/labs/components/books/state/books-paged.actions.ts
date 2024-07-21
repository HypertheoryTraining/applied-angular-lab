import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { BooksPageSize } from './books-paged.feature';

export const BooksPagedEvents = createActionGroup({
  source: 'Books Paged Events',
  events: {
    'Page Size Set To': props<{ payload: BooksPageSize }>(),

    'Next Page Requested': emptyProps(),
    'Prvious Page Requested': emptyProps(),
  },
});

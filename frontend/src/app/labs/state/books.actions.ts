import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { BookItem } from '../services/books.service';
import { BooksPageSize } from './books.feature';

export const BookActions = createActionGroup({
  source: 'Books Feature - Actions',
  events: {
    'Load The Books': emptyProps(),
    Books: props<{ payload: BookItem[] }>(),
    'Set Page Size': props<{ payload: BooksPageSize }>(),
    'Next Page': emptyProps(),
    'Previous Page': emptyProps(),
    'Set Filter': props<{ payload: string }>(),
    'Clear Filter': emptyProps(),
  },
});

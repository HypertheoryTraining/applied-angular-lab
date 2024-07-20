import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { BookItem } from '../services/books.service';
import { BookSortDirection, BookSortkey, BooksPageSize } from './books.feature';

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
    'Set Sort': props<{ by: BookSortkey; direction: BookSortDirection }>(),
    'Filter Subset By Author': props<{ payload: string }>(),
    'Filter Subset By Year': props<{ payload: number }>(),
    'Clear Filter Subset': emptyProps(),
  },
});

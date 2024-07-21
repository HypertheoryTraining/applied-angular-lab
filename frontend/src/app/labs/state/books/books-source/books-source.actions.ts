import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { BookItem } from '../models';

export const BooksSourceCommands = createActionGroup({
  source: '[Books Source] Commands',
  events: {
    'Load Books': emptyProps(),
  },
});

export const BooksSourceDocuments = createActionGroup({
  source: '[Books Source] Documents',
  events: {
    Books: props<{ payload: BookItem[] }>(),
  },
});

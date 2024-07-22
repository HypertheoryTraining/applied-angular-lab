import { Routes } from '@angular/router';
import { BooksComponent } from './books.component';
import { provideState } from '@ngrx/store';
import { BooksSortedFeature } from './components/list/state/books-sorted.feature';
import { BooksPagedFeature } from './components/state/books-paged.feature';
import { provideEffects } from '@ngrx/effects';
import { BooksEffects } from './state/books.effects';

export const BOOK_ROUTES: Routes = [
  {
    path: '',
    component: BooksComponent,
    providers: [
      provideState(BooksSortedFeature),
      provideState(BooksPagedFeature),
      provideEffects([BooksEffects]),
    ],
  },
];

import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import {
  BooksSourceCommands,
  BooksSourceDocuments,
} from './books/books-source/books-source.actions';
import { BooksDataService } from '../../services/books.service';

@Injectable({ providedIn: 'root' })
export class BooksEffects {
  #actions$ = inject(Actions);
  #service = inject(BooksDataService);

  loadBooks$ = createEffect(() => {
    return this.#actions$.pipe(
      ofType(BooksSourceCommands.loadBooks),
      switchMap(() =>
        this.#service
          .getBooks()
          .pipe(map(payload => BooksSourceDocuments.books({ payload })))
      )
    );
  });
}

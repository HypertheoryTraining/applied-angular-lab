import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { BookActions } from '../state/books.actions';
import { BooksFeature } from '../state/books.feature';
import { BooksListComponent } from './books-list.component';
import { BooksSummaryComponent } from './books-summary.component';
@Component({
  selector: 'app-books',
  standalone: true,
  imports: [JsonPipe, BooksListComponent, BooksSummaryComponent],
  template: `
    @if (books()) {
      <app-books-list [books]="pagedBooks() || []" />
      <app-books-summary [books]="books() || []" />
    }
  `,
  styles: ``,
})
export class BooksComponent {
  #store = inject(Store);
  pagedBooks = this.#store.selectSignal(BooksFeature.selectPagedBooks);
  books = this.#store.selectSignal(BooksFeature.selectBooks);
  constructor() {
    this.#store.dispatch(BookActions.loadTheBooks());
  }
}

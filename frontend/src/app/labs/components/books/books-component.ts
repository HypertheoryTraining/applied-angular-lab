import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { BooksSourceCommands } from '../../state/books/books-source/books-source.actions';
import { BookListComponent } from './components/book-list.component';
import { BooksPageSizeSelectorComponent } from './components/books-page-size-selector.component';

@Component({
  standalone: true,
  imports: [JsonPipe, BookListComponent, BooksPageSizeSelectorComponent],
  template: `
    <p>Books</p>
    <app-books-page-size-selector />
    <app-book-list />
  `,
  styles: ``,
})
export class BooksComponent {
  #store = inject(Store);

  constructor() {
    this.#store.dispatch(BooksSourceCommands.loadBooks());
  }
}

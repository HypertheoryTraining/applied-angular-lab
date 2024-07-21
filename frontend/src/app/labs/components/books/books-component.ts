import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { BooksSourceCommands } from '../../state/books/books-source/books-source.actions';
import { BookListComponent } from './components/book-list.component';
import { BooksPageSizeSelectorComponent } from './components/books-page-size-selector.component';
import { BooksPagerComponent } from './components/books-pager.component';

@Component({
  standalone: true,
  imports: [
    JsonPipe,
    BookListComponent,
    BooksPageSizeSelectorComponent,
    BooksPagerComponent,
  ],
  template: `
    <p>Books</p>
    <div
      class="grid grid-cols-2 grid-rows-1 w-full min-w-max gap-4 text-center p-4 border-2 border-gray-400 border-spacing-4 border-dotted">
      <div>
        <app-books-page-size-selector />
        <p class="font-light italic mt-2">Page Size</p>
      </div>
      <div class="content-center">
        <app-books-pager />
        <span class="font-light italic mt-2">Page</span>
      </div>
    </div>

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

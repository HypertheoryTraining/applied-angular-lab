import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { BookListComponent } from './components/list/list.component';
import { BooksPageSizeSelectorComponent } from './components/paging/components/page-size/books-page-size-selector.component';
import { BooksPagerComponent } from './components/paging/components/pager/books-pager.component';
import { PagingComponent } from './components/paging/paging.component';
import { BooksSourceCommands } from './state/books/books-source/books-source.actions';

@Component({
  standalone: true,
  imports: [
    JsonPipe,
    BookListComponent,
    BooksPageSizeSelectorComponent,
    BooksPagerComponent,
    PagingComponent,
  ],
  template: ` <book-list /> `,
  styles: ``,
})
export class BooksComponent {
  #store = inject(Store);

  constructor() {
    this.#store.dispatch(BooksSourceCommands.loadBooks());
  }
}

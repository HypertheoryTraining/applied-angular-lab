import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { BooksListHeaderSortComponent } from './components/books-list-header-sort.component';
import State from './state';
import { PagingComponent } from '../paging/paging.component';

@Component({
  selector: 'book-list',
  standalone: true,
  imports: [BooksListHeaderSortComponent, PagingComponent],
  template: ` <div class="h-dvh">
    <div class="flex flex-row dark: bg-slate-800 p-4 mt-4">
      <div><app-books-list-header-sort key="id" /></div>
      <div><app-books-list-header-sort key="title" /></div>
      <div><app-books-list-header-sort key="author" /></div>
      <div class="pr-8"><app-books-list-header-sort key="year" /></div>
      <div><books-paging /></div>
    </div>

    <div class="overflow-x-auto h-4/6 ">
      <div
        class="grid gap-4 justify-items-stretch sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 backdrop-brightness-200 p-8">
        @for (book of books(); track book.id) {
          <div
            class="card card-bordered bg-slate-800  hover:drop-shadow-lg hover:ring-2  hover:-translate-y-2  transition-all duration-75 hover:brightness-110  ">
            <div class="card-body">
              <h2 class="card-title">{{ book.title }}</h2>
              <p>By {{ book.author }}</p>
              <p>Published in {{ book.year }}</p>
            </div>
          </div>
        }
      </div>
    </div>
  </div>`,
  styles: ``,
})
export class BookListComponent {
  #store = inject(Store);
  books = this.#store.selectSignal(State.selectBookList);
}

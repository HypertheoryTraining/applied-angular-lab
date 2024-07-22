import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { BooksListHeaderSortComponent } from './components/books-list-header-sort.component';
import State from './state';

@Component({
  selector: 'book-list',
  standalone: true,
  imports: [BooksListHeaderSortComponent],
  template: ` <div class="overflow-x-auto h-svh max-h-full">
    <table
      class="table table-zebra table-pin-rows dark: bg-slate-800 p-4 mt-4 drop-shadow-lg">
      <thead>
        <td><app-books-list-header-sort key="id" /></td>
        <td><app-books-list-header-sort key="title" /></td>
        <td><app-books-list-header-sort key="author" /></td>
        <td><app-books-list-header-sort key="year" /></td>
      </thead>
      <tbody>
        @for (book of books(); track book.id) {
          <tr>
            <td>
              <span>{{ book.id }}</span>
            </td>
            <td class="w-1/3 overflow-clip">
              <span>{{ book.title }}</span>
            </td>
            <td class="w-1/3">
              <span>
                {{ book.author }}
              </span>
            </td>
            <td>
              <span>
                {{ book.year }}
              </span>
            </td>
          </tr>
        }
      </tbody>
    </table>
  </div>`,
  styles: ``,
})
export class BookListComponent {
  #store = inject(Store);
  books = this.#store.selectSignal(State.selectBookList);
}

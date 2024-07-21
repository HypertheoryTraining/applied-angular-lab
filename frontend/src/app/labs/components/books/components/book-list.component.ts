import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { BookListSelectors } from '../state';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [JsonPipe],
  template: ` <div class="overflow-x-auto h-svh max-h-full">
    <table class="table table-zebra table-pin-rows ">
      <thead>
        <td>Id</td>
        <td>Title</td>
        <td>Author</td>
        <td>Year</td>
      </thead>
      <tbody>
        @for (book of books(); track book.id) {
          <tr>
            <td class="w-12">
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
  books = this.#store.selectSignal(BookListSelectors.selectBookList);
}

import { Component, inject, input } from '@angular/core';
import { BookItem } from '../services/books.service';
import { BooksPageSizeSelectorComponent } from './books-page-size-selector.component';
import { BooksPagerComponent } from './books-pager.component';
import { BooksFilterComponent } from './books-filter.component';
import {
  BooksFeature,
  BookSortDirection,
  BookSortkey,
} from '../state/books.feature';
import { Store } from '@ngrx/store';
import { BookActions } from '../state/books.actions';
import { BooksListSortHeaderComponent } from './books-list-sort-header.component';

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [
    BooksPageSizeSelectorComponent,
    BooksPagerComponent,
    BooksFilterComponent,
    BooksListSortHeaderComponent,
  ],
  template: `
    <div>
      <app-books-page-size-selector />
    </div>
    <div>
      <app-books-filter />
    </div>
    <table>
      <thead>
        <td>
          <app-books-list-sort-header key="id" />
        </td>
        <td>
          <app-books-list-sort-header key="title" />
        </td>
        <td>
          <app-books-list-sort-header key="author" />
        </td>
        <td>
          <app-books-list-sort-header key="year" />
        </td>
      </thead>
      <tbody>
        @for (book of books(); track book.id) {
          <tr>
            <td>{{ book.id }}</td>
            <td>{{ book.title }}</td>
            <td>{{ book.author }}</td>
            <td>{{ book.year }}</td>
          </tr>
        }
      </tbody>
    </table>
    <div>
      <app-books-pager />
    </div>
  `,
  styles: ``,
})
export class BooksListComponent {
  books = input.required<BookItem[]>();
  #store = inject(Store);
}

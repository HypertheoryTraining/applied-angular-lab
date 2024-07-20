import { Component, input } from '@angular/core';
import { BookItem } from '../services/books.service';
import { BooksPageSizeSelectorComponent } from './books-page-size-selector.component';
import { BooksPagerComponent } from './books-pager.component';
import { BooksFilterComponent } from './books-filter.component';

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [
    BooksPageSizeSelectorComponent,
    BooksPagerComponent,
    BooksFilterComponent,
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
        <td>Id</td>
        <td>Title</td>
        <td>Author</td>
        <td>Year</td>
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
}

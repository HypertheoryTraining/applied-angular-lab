import { animate, style, transition, trigger } from '@angular/animations';
import { Component, inject, input } from '@angular/core';
import { Store } from '@ngrx/store';
import { BookItem } from '../services/books.service';
import { BookActions } from '../state/books.actions';
import { BooksFeature } from '../state/books.feature';
import { BooksFilterComponent } from './books-filter.component';
import { BooksListSortHeaderComponent } from './books-list-sort-header.component';
import { BooksPageSizeSelectorComponent } from './books-page-size-selector.component';
import { BooksPagerComponent } from './books-pager.component';

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [
    BooksPageSizeSelectorComponent,
    BooksPagerComponent,
    BooksFilterComponent,
    BooksListSortHeaderComponent,
  ],
  animations: [],
  template: `
    <div>
      <app-books-page-size-selector />
    </div>
    <div>
      <app-books-filter />
    </div>
    <div class="flex">
      <div>
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
                <td>
                  <span>{{ book.id }}</span>
                </td>
                <td>
                  <span>{{ book.title }}</span>
                </td>
                <td>
                  <span>
                    <button
                      (click)="filterAuthor(book.author)"
                      class="btn btn-link">
                      {{ book.author }}
                    </button>
                  </span>
                </td>
                <td>
                  <span>
                    <button
                      (click)="filterYear(book.year)"
                      class="btn btn-link">
                      {{ book.year }}
                    </button>
                  </span>
                </td>
              </tr>
            }
          </tbody>
        </table>
        <div>
          <app-books-pager />
        </div>
      </div>
      <div class="w-1/2">
        <div>
          @if (author() !== null) {
            <h3 class="font-bold text-lg">Books by {{ author() }}</h3>
          }
          @if (year() !== null) {
            <h3 class="font-bold text-lg">Books in {{ year() }}</h3>
          }
          @for (book of subset(); track book.id) {
            <p class="ml-4">
              {{ book.title }} by {{ book.author }} in {{ book.year }}
            </p>
          }
          @if (subset().length) {
            <div>
              <button
                (click)="clearSubsetFilter()"
                class="btn btn-sm btn-primary">
                Clear
              </button>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: `
    tbody tr {
      animation: show 600ms 100ms cubic-bezier(0.38, 0.97, 0.56, 0.76) forwards;
      opacity: 0;
    }
    @keyframes show {
      100% {
        opacity: 1;
      }
    }
  `,
})
export class BooksListComponent {
  books = input.required<BookItem[]>();
  #store = inject(Store);
  author = this.#store.selectSignal(BooksFeature.selectAuthorFilter);
  year = this.#store.selectSignal(BooksFeature.selectYearFilter);
  subset = this.#store.selectSignal(BooksFeature.selectFilteredSubset);
  filterAuthor(payload: string) {
    this.#store.dispatch(BookActions.filterSubsetByAuthor({ payload }));
  }
  filterYear(payload: number) {
    this.#store.dispatch(BookActions.filterSubsetByYear({ payload }));
  }
  clearSubsetFilter() {
    this.#store.dispatch(BookActions.clearFilterSubset());
  }
}

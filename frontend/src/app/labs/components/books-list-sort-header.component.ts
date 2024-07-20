import { Component, inject, input } from '@angular/core';
import {
  BooksFeature,
  BookSortDirection,
  BookSortkey,
} from '../state/books.feature';
import { TitleCasePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { BookActions } from '../state/books.actions';

@Component({
  selector: 'app-books-list-sort-header',
  standalone: true,
  imports: [TitleCasePipe],
  template: `
    @if (sortingBy() === key()) {
      @switch (sortingDirection()) {
        @case ('asc') {
          <button (click)="setSort(key(), 'desc')" class="btn btn-link">
            {{ key() | titlecase }} (asc)
          </button>
        }
        @case ('desc') {
          <button (click)="setSort(key(), 'asc')" class="btn btn-link">
            {{ key() | titlecase }} (desc)
          </button>
        }
      }
    } @else {
      <button (click)="setSort(key(), 'asc')" class="btn btn-link">
        {{ key() | titlecase }}
      </button>
    }
  `,
  styles: ``,
})
export class BooksListSortHeaderComponent {
  key = input.required<BookSortkey>();
  #store = inject(Store);
  sortingBy = this.#store.selectSignal(BooksFeature.selectSortingBy);
  sortingDirection = this.#store.selectSignal(BooksFeature.selectSortDirection);
  setSort(by: BookSortkey, direction: BookSortDirection) {
    this.#store.dispatch(
      BookActions.setSort({
        by,
        direction,
      })
    );
  }
}

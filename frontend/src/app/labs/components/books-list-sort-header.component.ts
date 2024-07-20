import { Component, inject, input } from '@angular/core';
import {
  BooksFeature,
  BookSortDirection,
  BookSortkey,
} from '../state/books.feature';
import { NgClass, TitleCasePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { BookActions } from '../state/books.actions';

@Component({
  selector: 'app-books-list-sort-header',
  standalone: true,
  imports: [TitleCasePipe, NgClass],
  template: `
    <button
      (click)="setSort(key())"
      class="btn btn-link "
      [ngClass]="{
        sort: sortingBy() === key(),
        'sort-asc': sortingDirection() === 'asc',
        'sort-desc': sortingDirection() === 'desc',
      }">
      {{ key() | titlecase }}
    </button>
  `,
  styles: `
    button.sort.sort-asc:after {
      content: 'A';
    }

    button.sort.sort-desc:after {
      content: 'D';
    }
  `,
})
export class BooksListSortHeaderComponent {
  key = input.required<BookSortkey>();
  #store = inject(Store);
  sortingBy = this.#store.selectSignal(BooksFeature.selectSortingBy);
  sortingDirection = this.#store.selectSignal(BooksFeature.selectSortDirection);
  setSort(by: BookSortkey) {
    const direction = this.sortingDirection() === 'asc' ? 'desc' : 'asc';
    this.#store.dispatch(
      BookActions.setSort({
        by,
        direction,
      })
    );
  }
}

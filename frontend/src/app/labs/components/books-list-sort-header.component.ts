import { NgClass, TitleCasePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Store } from '@ngrx/store';
import { BookSortingActions } from '../state/books-sorted.actions';
import { BooksSortedFeature } from '../state/books-sorted.feature';
import { BookSortkey } from '../state/books.feature';

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
      content: '↑';
    }

    button.sort.sort-desc:after {
      content: '↓';
    }
  `,
})
export class BooksListSortHeaderComponent {
  key = input.required<BookSortkey>();
  #store = inject(Store);
  sortingBy = this.#store.selectSignal(BooksSortedFeature.selectFilter);
  sortingDirection = this.#store.selectSignal(
    BooksSortedFeature.selectDirection
  );
  setSort(filter: BookSortkey) {
    const direction = this.sortingDirection() === 'asc' ? 'desc' : 'asc';
    this.#store.dispatch(
      BookSortingActions.setSort({
        payload: {
          filter,
          direction,
        },
      })
    );
  }
}

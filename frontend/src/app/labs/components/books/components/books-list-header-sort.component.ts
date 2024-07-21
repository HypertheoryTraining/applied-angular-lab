import { NgClass, TitleCasePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { BookSortkey } from '../../../state/books.feature';
import { Store } from '@ngrx/store';
import {
  BooksSortedFeature,
  SortDirection,
} from '../state/books-sorted.feature';
import { BookSortedEvents } from '../state/books-sorted.actions';

@Component({
  selector: 'app-books-list-header-sort',
  standalone: true,
  imports: [TitleCasePipe, NgClass],
  template: `
    @let d = direction() === 'asc' ? 'asc' : 'desc';
    @let next = d === 'asc' ? 'desc' : 'asc';
    <button
      (click)="setSort(key(), next)"
      class="btn btn-link "
      [ngClass]="{
        sort: sortingBy() === key(),
        'sort-asc': d === 'asc',
        'sort-desc': d === 'desc',
      }">
      {{ key() | titlecase }}
    </button>
  `,
  styles: `
    button.sort {
      @apply uppercase;
    }
    button.sort.sort-asc:before {
      content: '↑';
    }
    button.sort.sort-desc:before {
      content: '↓';
    }
  `,
})
export class BooksListHeaderSortComponent {
  key = input.required<BookSortkey>();
  #store = inject(Store);
  sortingBy = this.#store.selectSignal(BooksSortedFeature.selectSortingBy);
  direction = this.#store.selectSignal(BooksSortedFeature.selectDirection);

  setSort(by: BookSortkey, direction: SortDirection) {
    this.#store.dispatch(
      BookSortedEvents.sortBySet({ payload: { sortingBy: by, direction } })
    );
  }
}

import { NgClass, TitleCasePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Store } from '@ngrx/store';
import type { BookKeys, SortDirection } from '../state';
import { ListHeaderState, ListHeaderState as State } from '../state';
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
  key = input.required<BookKeys>();
  #store = inject(Store);
  sortingBy = this.#store.selectSignal(ListHeaderState.selectSortingBy);
  direction = this.#store.selectSignal(ListHeaderState.selectSortDirection);

  setSort(by: BookKeys, direction: SortDirection) {
    this.#store.dispatch(
      ListHeaderState.sortBySet({ payload: { sortingBy: by, direction } })
    );
  }
}

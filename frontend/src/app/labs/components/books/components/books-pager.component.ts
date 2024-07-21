import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { BooksPagedEvents } from '../state/books-paged.actions';
import { BooksPagedFeature } from '../state/books-paged.feature';

@Component({
  selector: 'app-books-pager',
  standalone: true,
  imports: [],
  template: `
    <div class="">
      <div class="join flex-row">
        <button (click)="prev()" class="join-item btn">«</button>
        <button class="join-item btn">
          Page {{ summary().current }} of {{ summary().of }}
        </button>
        <button (click)="next()" class="join-item btn">»</button>
      </div>
    </div>
  `,
  styles: ``,
})
export class BooksPagerComponent {
  #store = inject(Store);

  summary = this.#store.selectSignal(BooksPagedFeature.selectPageSummary);
  next() {
    this.#store.dispatch(BooksPagedEvents.nextPageRequested());
  }
  prev() {
    this.#store.dispatch(BooksPagedEvents.prviousPageRequested());
  }
}

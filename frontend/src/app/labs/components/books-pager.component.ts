import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { BookActions } from '../state/books.actions';
import { BooksFeature } from '../state/books.feature';

@Component({
  selector: 'app-books-pager',
  standalone: true,
  imports: [],
  template: `
    <div class="join">
      <button
        class="join-item btn"
        [disabled]="previousDisabled()"
        (click)="prev()">
        «
      </button>
      <button class="join-item btn">{{ pagerSummary() }}</button>
      <button
        class="join-item btn"
        [disabled]="nextDisabled()"
        (click)="next()">
        »
      </button>
    </div>
  `,
  styles: ``,
})
export class BooksPagerComponent {
  #store = inject(Store);
  previousDisabled = this.#store.selectSignal(
    BooksFeature.selectPreviousDisabled
  );
  pagerSummary = this.#store.selectSignal(BooksFeature.selectPagerSummary);
  nextDisabled = this.#store.selectSignal(BooksFeature.selectNextDisabled);
  next() {
    this.#store.dispatch(BookActions.nextPage());
  }
  prev() {
    this.#store.dispatch(BookActions.previousPage());
  }
}

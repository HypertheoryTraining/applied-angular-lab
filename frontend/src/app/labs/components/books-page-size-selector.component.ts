import { Component, inject } from '@angular/core';
import { BooksFeature, BooksPageSize } from '../state/books.feature';
import { Store } from '@ngrx/store';
import { BookActions } from '../state/books.actions';

@Component({
  selector: 'app-books-page-size-selector',
  standalone: true,
  imports: [],
  template: `
    <div class="join">
      <button
        [disabled]="currentSize() === 'all'"
        (click)="setPageSize('all')"
        class="btn join-item">
        All Results
      </button>
      <button
        [disabled]="currentSize() === 5"
        (click)="setPageSize(5)"
        class="btn join-item">
        Five Results
      </button>
      <button
        [disabled]="currentSize() === 10"
        (click)="setPageSize(10)"
        class="btn join-item">
        Ten Results
      </button>
      <button
        [disabled]="currentSize() === 25"
        (click)="setPageSize(25)"
        class="btn join-item">
        Twenty Five Results
      </button>
    </div>
  `,
  styles: ``,
})
export class BooksPageSizeSelectorComponent {
  #store = inject(Store);
  currentSize = this.#store.selectSignal(BooksFeature.selectPageSize);
  setPageSize(payload: BooksPageSize) {
    this.#store.dispatch(BookActions.setPageSize({ payload }));
  }
}

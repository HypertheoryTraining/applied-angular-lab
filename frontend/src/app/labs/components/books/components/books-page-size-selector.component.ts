import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { BooksPagedFeature, BooksPageSize } from '../state/books-paged.feature';
import { BooksPagedEvents } from '../state/books-paged.actions';

@Component({
  selector: 'app-books-page-size-selector',
  standalone: true,
  imports: [JsonPipe],
  template: `
    <div class="join">
      @for (option of options(); track option.size) {
        <button
          [disabled]="option.current"
          (click)="setPageSize(option.size)"
          class="btn join-item">
          {{ option.label }}
        </button>
      }
    </div>
  `,
  styles: ``,
})
export class BooksPageSizeSelectorComponent {
  #store = inject(Store);
  options = this.#store.selectSignal(BooksPagedFeature.selectPageSizeOptions);
  currentSize = this.#store.selectSignal(BooksPagedFeature.selectPageSize);
  setPageSize(size: BooksPageSize) {
    this.#store.dispatch(BooksPagedEvents.pageSizeSetTo({ payload: size }));
  }
}

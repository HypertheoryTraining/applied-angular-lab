import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import State from './state';
import { BooksPageSize } from '../../../state';

@Component({
  selector: 'books-page-size-selector',
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
  options = this.#store.selectSignal(State.selectPageSizeOptions);
  currentSize = this.#store.selectSignal(State.selectPageSize);
  setPageSize(size: BooksPageSize) {
    this.#store.dispatch(State.pageSizeSetTo({ payload: size }));
  }
}

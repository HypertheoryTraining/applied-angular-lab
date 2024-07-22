import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import State from './state';
@Component({
  selector: 'books-pager',
  standalone: true,
  imports: [],
  template: `
    <div class="">
      <div class="join flex-row">
        <button
          [disabled]="summary().atStart"
          (click)="prev()"
          class="join-item btn">
          «
        </button>
        <button class="join-item btn">
          Page {{ summary().current }} of {{ summary().of }}
        </button>
        <button
          [disabled]="summary().atEnd"
          (click)="next()"
          class="join-item btn">
          »
        </button>
      </div>
    </div>
  `,
  styles: ``,
})
export class BooksPagerComponent {
  #store = inject(Store);

  summary = this.#store.selectSignal(State.selectPagerSummary);
  next() {
    this.#store.dispatch(State.nextPageRequested());
  }
  prev() {
    this.#store.dispatch(State.previousPageRequested());
  }
}

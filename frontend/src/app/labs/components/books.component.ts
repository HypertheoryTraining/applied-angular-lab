import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { BookActions } from '../state/books.actions';
import { BooksFeature } from '../state/books.feature';
import { BooksListComponent } from './books-list.component';
import { BooksSummaryComponent } from './books-summary.component';
@Component({
  selector: 'app-books',
  standalone: true,
  animations: [],
  imports: [JsonPipe, BooksListComponent, BooksSummaryComponent],
  template: `
    @if (books()) {
      <app-books-list [books]="pagedBooks() || []" />
      <div class="collapse bg-base-200 pt-4" (click)="toggle()">
        <input type="checkbox" [checked]="showSummary()" />
        <div class="collapse-title text-xl font-medium">
          Show the Century Breakdown for All Books
        </div>
        <div class="collapse-content">
          <app-books-summary [books]="books()" />
        </div>
      </div>
    }
  `,
  styles: ``,
})
export class BooksComponent {
  #store = inject(Store);
  pagedBooks = this.#store.selectSignal(BooksFeature.selectPagedBooks);
  books = this.#store.selectSignal(BooksFeature.selectBooks);
  showSummary = signal(false);
  constructor() {
    this.#store.dispatch(BookActions.loadTheBooks());
  }
  toggle() {
    this.showSummary.set(!this.showSummary());
  }
}

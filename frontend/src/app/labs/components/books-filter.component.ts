import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, filter, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { BookActions } from '../state/books.actions';
@Component({
  selector: 'app-books-filter',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form">
      <input class="input input-bordered" formControlName="filter" />
      @if (isfiltering()) {
        <button (click)="clear()" class="btn btn-sm btn-secondary">
          Clear Filter
        </button>
      }
    </form>
  `,
  styles: ``,
})
export class BooksFilterComponent implements OnInit {
  form = new FormGroup({
    filter: new FormControl<string>(''),
  });
  isfiltering = signal(false);

  constructor() {
    this.form.controls.filter.valueChanges
      .pipe(
        debounceTime(400),
        filter(r => r !== ''),
        tap(r => console.log(r)),

        tap(v => {
          if (v?.trim()?.length || 0 > 0) {
            this.isfiltering.set(true);
          }
          this.#store.dispatch(BookActions.setFilter({ payload: v || '' }));
        }),
        takeUntilDestroyed()
      )
      .subscribe();
  }
  clear() {
    this.#store.dispatch(BookActions.clearFilter());
    this.form.controls.filter.setValue('');
    this.isfiltering.set(false);
  }
  #store = inject(Store);
  ngOnInit(): void {}
}

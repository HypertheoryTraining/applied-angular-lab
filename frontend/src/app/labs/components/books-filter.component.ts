import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { BookActions } from '../state/books.actions';
@Component({
  selector: 'app-books-filter',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form">
      <input class="input input-bordered" formControlName="filter" />
    </form>
  `,
  styles: ``,
})
export class BooksFilterComponent implements OnInit {
  form = new FormGroup({
    filter: new FormControl<string>(''),
  });

  constructor() {
    this.form.controls.filter.valueChanges
      .pipe(
        debounceTime(400),
        tap(r => console.log(r)),
        tap(v =>
          this.#store.dispatch(BookActions.setFilter({ payload: v || '' }))
        ),
        takeUntilDestroyed()
      )
      .subscribe();
  }
  #store = inject(Store);
  ngOnInit(): void {}
}

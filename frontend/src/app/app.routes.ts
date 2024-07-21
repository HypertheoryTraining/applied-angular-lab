import { CanActivateFn, Routes } from '@angular/router';
import { CounterComponent } from './labs/components/counter.component';
import { PrefsComponent } from './labs/components/prefs.component';
import { LabsComponent } from './labs/labs.component';
import { StudentsComponent } from './students/students.component';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { BooksComponent } from './labs/components/books/books-component';
import { BooksEffects } from './labs/state/books.effects';
import { BooksSourceFeature } from './labs/state/books/books-source/books-source.feature';
import { BooksSortedFeature } from './labs/components/books/state/books-sorted.feature';
import { BooksPagedFeature } from './labs/components/books/state/books-paged.feature';

export const routes: Routes = [
  {
    path: 'students',
    component: StudentsComponent,
    children: [
      {
        path: 'signals',
        loadComponent: () =>
          import('./students/signals/signals.component').then(
            c => c.SignalsComponent
          ),
      },
    ],
  },
  {
    path: 'dashboard',
    canActivate: [],
    loadChildren: () =>
      import('./dashboard/dashboard.routes').then(r => r.DASHBOARD_ROUTES),
  },
  {
    path: 'labs',
    component: LabsComponent,
    providers: [provideState(BooksSourceFeature)],
    children: [
      {
        path: 'counter',
        component: CounterComponent,
      },
      {
        path: 'prefs',
        component: PrefsComponent,
      },
      {
        path: 'books',
        providers: [
          provideState(BooksSortedFeature),
          provideState(BooksPagedFeature),
          provideEffects([BooksEffects]),
          provideAnimationsAsync(),
        ],
        component: BooksComponent,
      },
    ],
  },
];

function userDataLoadedGuard(): CanActivateFn {
  return () => false;
}

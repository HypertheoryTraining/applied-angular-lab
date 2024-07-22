import { Routes } from '@angular/router';
import { CounterComponent } from './labs/components/counter.component';
import { PrefsComponent } from './labs/components/prefs.component';
import { LabsComponent } from './labs/labs.component';
import { StudentsComponent } from './students/students.component';

import { provideState } from '@ngrx/store';
import { BooksSourceFeature } from './labs/books/state/books/books-source/books-source.feature';

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
        loadChildren: () =>
          import('./labs/books/books.routes').then(b => b.BOOK_ROUTES),
      },
    ],
  },
];

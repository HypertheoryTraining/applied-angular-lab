import { CanActivateFn, Routes } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import { LabsComponent } from './labs/labs.component';
import { CounterComponent } from './labs/components/counter.component';
import { PrefsComponent } from './labs/components/prefs.component';
import { BooksComponent } from './labs/components/books.component';
import { provideState } from '@ngrx/store';
import { BooksFeature } from './labs/state/books.feature';
import { provideEffects } from '@ngrx/effects';
import { BooksEffects } from './labs/state/books.effects';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

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
          provideState(BooksFeature),
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

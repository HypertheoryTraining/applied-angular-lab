import { inject } from '@angular/core';
import { CanActivateFn, Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState, Store } from '@ngrx/store';
import { UiStateFeature } from '../state/ui-state';
import { CreateIssuesComponent } from './create-issues/create-issues.component';
import { BeginComponent } from './create-issues/steps/begin.component';
import { DashboardComponent } from './dashboard.component';
import { MockupComponent } from './mockup/mockup.component';
import { DashboardNavigationEffect } from './state/effects/navigation.effect';
import { EntitleSoftwareEffect } from './state/effects/software.effect';
import { UserSoftwareFeature } from './state/reducers/user-software.feature';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    canActivateChild: [userIsLoadedGuard()],
    providers: [
      provideState(UserSoftwareFeature),
      provideEffects([DashboardNavigationEffect, EntitleSoftwareEffect]),
    ], // { navigateWhatever: createEffect() }

    component: DashboardComponent,
    children: [
      {
        path: 'mock',
        component: MockupComponent,
      },

      {
        path: 'create-issue',
        component: CreateIssuesComponent,
        canActivateChild: [userSoftwareIsLoadedGuard()],
        children: [
          {
            path: 'begin',
            component: BeginComponent,
          },
          // {
          //   path: '',
          //   redirectTo: 'begin',
          // },
        ],
      },
    ],
  },
];

function userIsLoadedGuard(): CanActivateFn {
  // don't use inject here. doesn't work. trust me.

  return () => {
    const store = inject(Store);
    const userLoaded = store.selectSignal(UiStateFeature.selectUser);
    return userLoaded().isPresent;
  };
}

function userSoftwareIsLoadedGuard(): CanActivateFn {
  return () => {
    // const store = inject(Store);
    return inject(Store).selectSignal(UiStateFeature.selectUserSoftware)()
      .isPresent;
  };
}

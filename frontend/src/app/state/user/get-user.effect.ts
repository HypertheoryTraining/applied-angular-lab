import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { UserDataService } from '../services/user-data.service';
import { UserActions } from './actions';
// when you tell me to load the user, I'm going to api, when that is dohne, I am going to give you the user.

export const loadUser = createEffect(
  (actions$ = inject(Actions), service = inject(UserDataService)) => {
    return actions$.pipe(
      ofType(UserActions.getTheUser),
      switchMap(() =>
        service
          .getUser()
          .pipe(map(user => UserActions.userLoaded({ payload: user })))
      )
    );
  },
  { functional: true }
);

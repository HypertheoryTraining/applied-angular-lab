// LoadTheEntitledSoftware => ?? => [HeresYourData, Error]

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SoftwareListActions } from '../actions/list.actions';
import { map, switchMap } from 'rxjs';
import { SoftwareItem } from '../reducers/user-software.feature';

@Injectable({ providedIn: 'root' })
export class EntitleSoftwareEffect {
  loadUserEntitledSoftware$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SoftwareListActions.loadTheEntitiledSoftware),
      switchMap(() =>
        this.client.get<{ data: SoftwareItem[] }>('/api/user/software').pipe(
          map(response => response.data),
          map(payload => SoftwareListActions.entitledSoftware({ payload }))
        )
      )
    );
  });
  constructor(
    private actions$: Actions,
    private client: HttpClient
  ) {}
}

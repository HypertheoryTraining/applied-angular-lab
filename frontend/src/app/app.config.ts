import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withPreloading,
} from '@angular/router';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { routes } from './app.routes';
import { UiStateFeature } from './state/ui-state';
import { navigationInterceptor } from './state/ui-state/interceptor';
import { loadUser } from './state/user/get-user.effect';
import { UserFeature } from './state/user/user-feature';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(withInterceptors([navigationInterceptor])),
    provideStore(),
    provideState(UserFeature),
    provideState(UiStateFeature),
    provideStoreDevtools(), // maybe do this only in isDev
    provideEffects({ loadUser: loadUser }),
  ],
};

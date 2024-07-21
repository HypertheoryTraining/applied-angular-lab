import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { UserActions } from './state/user/actions';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <app-nav-bar />
    <main class="container mx-auto">
      <router-outlet />
    </main>
  `,
  styles: [],
  imports: [RouterOutlet, NavBarComponent],
})
export class AppComponent {
  constructor(store: Store) {
    store.dispatch(UserActions.getTheUser());
  }
}

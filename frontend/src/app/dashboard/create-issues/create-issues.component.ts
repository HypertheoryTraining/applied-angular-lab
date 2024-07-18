import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LinkDirective } from '../../directives/link.directive';
import { Store } from '@ngrx/store';
import { ModeKeys, UiStateFeature } from '../../state/ui-state';

@Component({
  standalone: true,
  imports: [RouterOutlet, RouterLink, LinkDirective],
  template: `
    <h1>All The Issues Stuff</h1>
    @if (isMode('isPresent')) {
      <a appLink routerLink="begin">Start A New Issue</a>
    }
    @if (isMode('isLoading')) {
      <p>Loading...(MOCK HERE)</p>
    }
    <pre>
    @for(mode of softwareModes(); track mode) { @switch(mode) { @case
    ('isLoading'){
    <p>Loading</p>
    } @case ('isPresent') {
    <p>Present</p>
    } @case ('isError') {
    <p>Error</p>
    } } }
  </pre>
    <router-outlet />
  `,
  styles: ``,
})
export class CreateIssuesComponent {
  softwareModes = inject(Store).selectSignal(
    UiStateFeature.selectSoftwareModes
  );

  isMode(mode: ModeKeys) {
    return this.softwareModes().indexOf(mode) > -1;
  }
}

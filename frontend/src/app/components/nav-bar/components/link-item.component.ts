import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavItem } from '../models';

@Component({
  selector: 'app-link-item',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <li>
      <a
        [routerLinkActive]="['font-bold', 'border-b-2']"
        [routerLink]="link().link"
        >{{ link().label }}</a
      >
    </li>
  `,
  styles: ``,
})
export class LinkItemComponent {
  link = input.required<NavItem>();
}

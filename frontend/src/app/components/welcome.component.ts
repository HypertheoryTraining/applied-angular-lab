import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [],
  template: `
    <div class="prose pt-12">
      <h1>Applied Angular</h1>
      <p>Hypertheory Training</p>
      <iframe
        src="https://giphy.com/embed/h2ZHafpzqVXssKkBbt"
        width="480"
        height="319"
        style=""
        frameBorder="0"
        class="giphy-embed"
        allowFullScreen></iframe>
      <p>
        <a
          href="https://giphy.com/stickers/justin-transparent-h2ZHafpzqVXssKkBbt"
          >via GIPHY</a
        >
      </p>
    </div>
  `,
  styles: ``,
})
export class WelcomeComponent {}

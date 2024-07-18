import { Component, computed, inject, signal } from '@angular/core';
import { CounterService } from '../services/counter.service';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  template: `
    <h1>Counter Here</h1>

    <div>
      <button
        [disabled]="disableSubtract()"
        (click)="counter.decrement()"
        class="btn btn-primary p-4">
        Decrement</button
      ><span class="text-xl p-8">{{ current() }}</span
      ><button (click)="counter.increment()" class="btn btn-primary p-4">
        Increment
      </button>
    </div>
    @if (fizzBuzz()) {
      <div class="alert alert-info">
        <p>{{ fizzBuzz() }}</p>
      </div>
    }
  `,
  styles: ``,
})
export class CounterComponent {
  counter = inject(CounterService);
  #current = this.counter.current;
  disableSubtract = computed(() => this.current() === 0);

  current = computed(() => this.#current());
  fizzBuzz = computed(() => {
    let response = '';
    let current = this.current();
    if (current === 0) {
      return response; // Zero is NOT fizz nor Buzz and certainly not both, IMO.
    }
    if (current % 3 === 0) {
      response += 'Fizz';
    }
    if (current % 5 === 0) {
      response += 'Buzz';
    }
    return response;
  });
}

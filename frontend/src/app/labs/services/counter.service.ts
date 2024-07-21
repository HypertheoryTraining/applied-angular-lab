import { effect, Injectable, signal } from '@angular/core';
type CountByDelta = 1 | 3 | 5;
type CounterState = { current: number; by: CountByDelta };

@Injectable({ providedIn: 'root' })
export class CounterService {
  #current = signal(0);
  #by = signal<CountByDelta>(1);

  constructor() {
    const saved = localStorage.getItem('counter-data');
    if (saved !== null) {
      const data = JSON.parse(saved) as unknown as CounterState;

      this.#by.set(data.by);
      this.#current.set(data.current);
    }
    effect(() => {
      const state: CounterState = {
        by: this.#by(),
        current: this.#current(),
      };
      localStorage.setItem('counter-data', JSON.stringify(state));
    });
  }
  increment() {
    this.#current.set(this.#current() + this.#by());
  }

  decrement() {
    this.#current.set(this.#current() - this.#by());
  }

  get current() {
    return this.#current.asReadonly();
  }

  setCountBy(delta: CountByDelta) {
    this.#by.set(delta);
  }
  get by() {
    return this.#by.asReadonly();
  }
}

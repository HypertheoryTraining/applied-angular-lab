import { Component, computed, inject } from '@angular/core';
import { CounterService } from '../services/counter.service';

@Component({
  selector: 'app-prefs',
  standalone: true,
  imports: [],
  template: ` <div class="join">
    <button
      [disabled]="countingBy() === 1"
      (click)="counterServe.setCountBy(1)"
      class="btn join-item">
      1
    </button>
    <button
      [disabled]="countingBy() === 3"
      (click)="counterServe.setCountBy(3)"
      class="btn join-item">
      3
    </button>
    <button
      [disabled]="countingBy() == 5"
      (click)="counterServe.setCountBy(5)"
      class="btn join-item">
      5
    </button>
  </div>`,
  styles: ``,
})
export class PrefsComponent {
  counterServe = inject(CounterService);
  countingBy = computed(() => this.counterServe.by());
}

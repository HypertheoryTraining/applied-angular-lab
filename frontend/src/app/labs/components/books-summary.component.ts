import { Component, computed, input } from '@angular/core';
import { BookItem } from '../services/books.service';

@Component({
  selector: 'app-books-summary',
  standalone: true,
  imports: [],
  template: `
    <table>
      <thead>
        <td>Century</td>
        <td>Number of Books</td>
      </thead>
      <tbody>
        @for (book of summary(); track $index) {
          <tr>
            <td>{{ book.century }}th</td>
            <td>{{ book.books }}</td>
          </tr>
        }
      </tbody>
    </table>
  `,
  styles: ``,
})
export class BooksSummaryComponent {
  books = input.required<BookItem[]>();
  summary = computed(() => {
    let initialS: Record<string, number> = {};
    const cents =
      this.books()
        ?.map(b => Math.ceil(b.year / 100))
        .toSorted()
        .map(c => c.toString()) || [];
    const initialState: Record<string, number> = cents.reduce(
      (lhs, rhs) => ({ ...lhs, [rhs]: 0 }),
      initialS
    );
    const centuries =
      this.books()
        ?.map(b => ({
          century: Math.ceil(b.year / 100),
          count: 1,
        }))
        .reduce((lhs, rhs) => {
          return { ...lhs, [rhs.century]: (lhs[rhs.century] || 0) + 1 };
        }, initialState) || [];

    return Object.entries(centuries)
      .sort(a => +[a[0]])
      .map(c => ({ century: c[0], books: c[1] }));
  });
}

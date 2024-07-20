import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
@Component({
  selector: 'app-books',
  standalone: true,
  imports: [JsonPipe],
  template: `
    <table>
      <thead>
        <td>Id</td>
        <td>Title</td>
        <td>Author</td>
        <td>Year</td>
      </thead>
      <tbody>
        @for (book of books(); track book.id) {
          <tr>
            <td>{{ book.id }}</td>
            <td>{{ book.title }}</td>
            <td>{{ book.author }}</td>
            <td>{{ book.year }}</td>
          </tr>
        }
      </tbody>
    </table>
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
export class BooksComponent {
  client = inject(HttpClient);

  books = toSignal(
    this.client
      .get<{
        data: { id: string; title: string; author: string; year: number }[];
      }>('/api/books')
      .pipe(map(r => r.data))
  );

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

function range(start: number, end: number): number[] {
  if (start === end) return [start];
  return [start, ...range(start + 1, end)];
}

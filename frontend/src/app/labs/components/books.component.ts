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
  `,
  styles: ``,
})
export class BooksComponent {
  client = inject(HttpClient);

  books = toSignal(
    this.client
      .get<{
        data: { id: string; title: string; author: string; year: string }[];
      }>('/api/books')
      .pipe(map(r => r.data))
  );

  summary = computed(() => {
    const initialState: Record<string, number> = {};
    const group = Map.groupBy(this.books(), book => book.author);
    //  const earliest = this.books()?.reduce(n,p => )
    // const result = this.books()?.reduce((state, next) => {}, initialState);
  });
}

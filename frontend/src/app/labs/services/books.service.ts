import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';

export type BookItem = {
  id: string;
  title: string;
  author: string;
  year: number;
};
@Injectable({ providedIn: 'root' })
export class BooksDataService {
  #client = inject(HttpClient);
  getBooks() {
    return this.#client
      .get<{ data: BookItem[] }>('/api/books')
      .pipe(map(r => r.data));
  }
}

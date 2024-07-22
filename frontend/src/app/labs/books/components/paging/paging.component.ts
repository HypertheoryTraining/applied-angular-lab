import { Component } from '@angular/core';
import { BooksPageSizeSelectorComponent } from './components/page-size/books-page-size-selector.component';
import { BooksPagerComponent } from './components/pager/books-pager.component';

@Component({
  selector: 'books-paging',
  standalone: true,
  imports: [BooksPageSizeSelectorComponent, BooksPagerComponent],
  template: `
    <div
      class="grid grid-cols-2 grid-rows-1 w-full min-w-max gap-4 text-center ">
      <div>
        <books-page-size-selector />
      </div>
      <div class="content-center">
        <books-pager />
      </div>
    </div>
  `,
  styles: ``,
})
export class PagingComponent {}

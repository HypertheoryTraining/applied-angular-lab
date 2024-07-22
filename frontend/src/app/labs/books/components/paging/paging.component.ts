import { Component } from '@angular/core';
import { BooksPageSizeSelectorComponent } from './components/page-size/books-page-size-selector.component';
import { BooksPagerComponent } from './components/pager/books-pager.component';

@Component({
  selector: 'books-paging',
  standalone: true,
  imports: [BooksPageSizeSelectorComponent, BooksPagerComponent],
  template: `
    <div
      class="grid grid-cols-2 grid-rows-1 w-full min-w-max gap-4 text-center p-4 border-2 border-gray-400 border-spacing-4 border-dotted">
      <div>
        <books-page-size-selector />
        <p class="font-light italic mt-2">Page Size</p>
      </div>
      <div class="content-center">
        <books-pager />
        <span class="font-light italic mt-2">Page</span>
      </div>
    </div>
  `,
  styles: ``,
})
export class PagingComponent {}

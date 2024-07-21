import { BooksPagedFeature } from './books-paged.feature';
import { BooksSortedFeature } from './books-sorted.feature';

export const BookListSelectors = {
  selectBookList: BooksPagedFeature.selectPagedBooks,
};

import { BooksPagedFeature } from '../../state/books-paged.feature';
import { BookSortedEvents } from './books-sorted.actions';
import { BooksSortedFeature } from './books-sorted.feature';

export default {
  selectBookList: BooksPagedFeature.selectPagedBooks,
};

export const ListHeaderState = {
  selectSortingBy: BooksSortedFeature.selectSortingBy,
  selectSortDirection: BooksSortedFeature.selectDirection,
  ...BookSortedEvents,
};

export type { BookKeys, SortDirection } from './books-sorted.feature';

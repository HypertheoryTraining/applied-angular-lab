import { BooksPagedEvents } from '../../../state/books-paged.actions';
import { BooksPagedFeature } from '../../../state/books-paged.feature';
export default {
  selectPageSizeOptions: BooksPagedFeature.selectPageSizeOptions,
  selectPageSize: BooksPagedFeature.selectPageSize,
  ...BooksPagedEvents,
};

export type * from '../../../state/books-paged.feature';

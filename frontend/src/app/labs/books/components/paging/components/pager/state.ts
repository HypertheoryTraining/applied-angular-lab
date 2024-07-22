import { createSelector } from '@ngrx/store';
import { BooksPagedFeature } from '../../../state/books-paged.feature';
import { BooksPagedEvents } from '../../../state/books-paged.actions';
export default {
  selectPagerSummary: createSelector(
    BooksPagedFeature.selectPageSummary,
    summary => ({
      ...summary,
      atEnd: summary.current === summary.of,
      atStart: summary.current === 1,
    })
  ),
  ...BooksPagedEvents,
};

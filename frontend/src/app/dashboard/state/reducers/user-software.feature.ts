import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { SoftwareListActions } from '../actions/list.actions';
import createFuzzySearch, { fuzzyMatch, FuzzySearcher } from '@nozbe/microfuzz';

export type SoftwareItem = {
  id: string;
  name: string;
};

export type UserSoftwareState = {
  list: SoftwareItem[];
  titleFilter: string | null;
};

const initialState: UserSoftwareState = {
  list: [],
  titleFilter: null,
};
let fuzzySearch: FuzzySearcher<unknown>;
export const UserSoftwareFeature = createFeature({
  name: 'User Software',
  reducer: createReducer(
    initialState,
    on(SoftwareListActions.entitledSoftware, (s, a) => {
      fuzzySearch = createFuzzySearch(a.payload, { key: 'name' }); // Note: Slight "Redux" party fowl - should be in an effect.
      return {
        ...s,
        list: a.payload,
      };
    }),
    on(SoftwareListActions.listFilteredBy, (s, { payload }) => ({
      ...s,
      titleFilter: payload,
    }))
  ),
  extraSelectors: ({ selectList, selectTitleFilter }) => {
    return {
      selectFilteredList: createSelector(
        selectList,
        selectTitleFilter,
        (list, filter) => {
          if (!filter) {
            return list;
          }
          const results = fuzzySearch(filter).map(r => r.item);

          return results as unknown as SoftwareItem[];
        }
      ),
    };
  },
});

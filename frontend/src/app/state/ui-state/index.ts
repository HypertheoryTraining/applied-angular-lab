import {
  createActionGroup,
  createFeature,
  createReducer,
  createSelector,
  on,
  props,
} from '@ngrx/store';
import { HttpMethods } from 'msw';

type UiStateModeList = {
  isLoading: boolean;
  isFetching: boolean;
  isError: false | string;
  isPresent: boolean;
};
export type ModeKeys = keyof UiStateModeList;

type UiStateModes = UiStateModeList;
type UiState = {
  user: UiStateModes;
  userSoftware: UiStateModes;
};

const defaultUiStateMode: UiStateModes = {
  isError: false,
  isLoading: false,
  isFetching: false,
  isPresent: false,
};

const initialState: UiState = {
  user: defaultUiStateMode,
  userSoftware: defaultUiStateMode,
};

export type NavigationStartPayload = {
  url: string;
  method: string;
};
export type NavigationEndPayload = NavigationStartPayload & { status: number };

export const UiStateEvents = createActionGroup({
  source: 'Ui-State',
  events: {
    navigation: props<{ payload: NavigationStartPayload }>(),
    navigationEnd: props<{
      payload: NavigationEndPayload;
    }>(),
  },
});

export const UiStateFeature = createFeature({
  name: 'Ui-State',
  reducer: createReducer(
    initialState,
    on(UiStateEvents.navigation, (s, { payload }) =>
      handleNavigatonStart(s, payload)
    ),
    on(UiStateEvents.navigationEnd, (s, { payload }) =>
      handleNavigationEnd(s, payload)
    )
  ),

  extraSelectors: ({ selectUser, selectUserSoftware }) => ({
    selectUserModes: createSelector(selectUser, u => getModes(u)),
    selectSoftwareModes: createSelector(selectUserSoftware, u => getModes(u)),
  }),
});

const loadingStateMode: UiStateModes = {
  isError: false,
  isLoading: true,
  isFetching: false,
  isPresent: false,
};

const successStateMode: UiStateModes = {
  isError: false,
  isLoading: false,
  isFetching: false,
  isPresent: true,
};

const errorStateMode: Omit<UiStateModes, 'isError'> = {
  isLoading: false,
  isFetching: false,
  isPresent: false,
};

function getModes(state: UiStateModes): ModeKeys[] {
  return Object.keys(state).filter(
    m => state[m as unknown as ModeKeys] === true
  ) as unknown as ModeKeys[];
}
function handleNavigatonStart(
  state: UiState,
  a: NavigationStartPayload
): UiState {
  if (a.method === HttpMethods.GET && a.url === '/api/user') {
    return {
      ...state,
      user: { ...loadingStateMode },
    };
  }
  if (a.method === HttpMethods.GET && a.url === '/api/user/software') {
    return {
      ...state,
      userSoftware: {
        ...loadingStateMode,
      },
    };
  }
  return state;
}

function handleNavigationEnd(state: UiState, a: NavigationEndPayload): UiState {
  if (a.method === HttpMethods.GET && a.url === '/api/user') {
    if (a.status >= 200 && a.status < 400) {
      return {
        ...state,
        user: { ...successStateMode },
      };
    } else {
      return {
        ...state,
        user: {
          ...errorStateMode,
          isError: a.status.toString(),
        },
      };
    }
  }
  if (a.method === HttpMethods.GET && a.url === '/api/user/software') {
    if (a.status >= 200 && a.status < 400) {
      return {
        ...state,
        userSoftware: {
          ...successStateMode,
        },
      };
    } else {
      return {
        ...state,
        userSoftware: {
          ...errorStateMode,
          isError: a.status.toString(),
        },
      };
    }
  }
  return state;
}

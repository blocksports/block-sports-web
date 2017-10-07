import Immutable from 'immutable';
import { createAction, createReducer } from 'redux-act';
import { getNestedMarketsArray } from '../../../lib/utils';

import { mockNavigation } from './__mockData';

const fetchNavigationRequest = createAction('FETCH_NAVIGATION_REQUEST');
const fetchNavigationSuccess = createAction('FETCH_NAVIGATION_SUCCESS');

export function fetchNavigation(data) {
  return (dispatch) => {
    dispatch(fetchNavigationRequest());
    dispatch(fetchNavigationSuccess(mockNavigation));
  }
}

const initialState = Immutable.Map({
  isLoading: false,
  navigation: Immutable.List()
});

const navigationReducer = createReducer({
  [fetchNavigationRequest]: (state) => {
    return state.merge({
      isLoading: true
    });
  },
  [fetchNavigationSuccess]: (state, resp) => {
    return state.merge({
      isLoading: true,
      navigation: Immutable.fromJS(resp)
    });
  }
}, initialState);

export default navigationReducer;

import Immutable from 'immutable';
import { createAction, createReducer } from 'redux-act';
import { getNestedMarketsArray, calculateMatchPools } from '../../../lib/utils';
import { mockMarkets } from './__mockData';

const fetchMarketsRequest = createAction('FETCH_MARKETS_REQUEST');
const fetchMarketsSuccess = createAction('FETCH_MARKETS_SUCCESS', (data, resp) => [data, resp]);

const updateMinimum = createAction('UPDATE_MINIMUM_BET');

export function fetchMarkets(data) {
  return (dispatch) => {
    dispatch(fetchMarketsRequest());
    dispatch(fetchMarketsSuccess(data, mockMarkets));
  };
}

export function updateMinimumBet(data) {
  return (dispatch) => {
    dispatch(updateMinimum(data));
  };
}

const initialState = Immutable.Map({
  isLoading: false,
  minimumBet: 0,
  markets: Immutable.Map()
});

const exchangeReducer = createReducer({
  [fetchMarketsRequest]: (state) => {
    return state.merge({
      isLoading: true
    });
  },
  [fetchMarketsSuccess]: (state, [data, resp]) => {
    const nestedArray = getNestedMarketsArray(data);
    const oldMarkets = state.get('markets');

    calculateMatchPools(resp);

    const matches = Immutable.fromJS(resp);

    const newMarkets = oldMarkets.updateIn(nestedArray, (val = matches) => val);

    return state.merge({
      isLoading: false,
      markets: newMarkets
    });
  },
  [updateMinimum]: (state, data) => {
    return state.merge({
      minimumBet: data
    });
  }
}, initialState);

export default exchangeReducer;

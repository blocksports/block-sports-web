import Immutable from 'immutable';
import { createAction, createReducer } from 'redux-act';
import { getNestedMarketsArray } from '../../../lib/utils';

const fetchMarketsRequest = createAction('FETCH_MARKETS_REQUEST');
const fetchMarketsSuccess = createAction('FETCH_MARKETS_SUCCESS', (data, resp) => [data, resp]);

export function fetchMarkets(data) {
  return (dispatch) => {
    dispatch(fetchMarketsRequest());
    dispatch(fetchMarketsSuccess(data, ['a', 'b', 'c']));
  }
}

const initialState = Immutable.Map({
  isLoading: false,
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
    const newMarkets = oldMarkets.updateIn(nestedArray, (val = Immutable.fromJS(resp)) => val);

    return state.merge({
      isLoading: true,
      markets: newMarkets
    });
  }
}, initialState);

export default exchangeReducer;

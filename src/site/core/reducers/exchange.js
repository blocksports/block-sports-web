import Immutable from 'immutable';
import axios from 'axios';
import { createAction, createReducer } from 'redux-act';
import { getNestedMarketsArray } from '../../../lib/utils';
import { mockMarkets } from './__mockData';

const fetchMarketsRequest = createAction('FETCH_MARKETS_REQUEST');
const fetchMarketsSuccess = createAction('FETCH_MARKETS_SUCCESS', (data, resp) => [data, resp]);

const fetchMarketRequest = createAction('FETCH_MARKET_REQUEST');
const fetchMarketSuccess = createAction('FETCH_MARKET_SUCCESS', (data, resp) => [data, resp]);

const updateMinimum = createAction('UPDATE_MINIMUM_BET');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function fetchMarkets(data) {
  return async (dispatch) => {
    dispatch(fetchMarketsRequest());

    await sleep(2000);
    
    axios({
      method: 'get',
      url: '/v1/exchange',
      params: {
        sport: data.sport,
        competition: data.competition
      }
    }).then((resp) => {
      dispatch(fetchMarketsSuccess(data, resp));
    }).catch((err) => {
      dispatch(fetchMarketsSuccess(data, {data: mockMarkets}));
    });

  };
}

export function fetchMarket(data) {
  return (dispatch) => {
    dispatch(fetchMarketRequest());
    dispatch(fetchMarketSuccess(data, mockMarkets[0]));
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
  markets: Immutable.Map(),
  activeMarket: Immutable.Map()
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

    const matches = Immutable.fromJS(resp.data);

    const newMarkets = oldMarkets.updateIn(nestedArray, (val = matches) => val);

    return state.merge({
      isLoading: false,
      markets: newMarkets
    });
  },
  [fetchMarketRequest]: (state) => {
    return state.merge({
      isLoading: true
    });
  },
  [fetchMarketSuccess]: (state, [data, resp]) => {
    return state.merge({
      isLoading: false,
      activeMarket: Immutable.fromJS(resp)
    });
  },
  [updateMinimum]: (state, data) => {
    return state.merge({
      minimumBet: data
    });
  }
}, initialState);

export default exchangeReducer;

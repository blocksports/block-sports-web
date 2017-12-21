import Immutable from 'immutable';
import axios from 'axios';
import { createAction, createReducer } from 'redux-act';
import { getNestedMarketsArray } from '../../../lib/utils';
import { mockMarkets } from './__mockData';

const fetchMarketsRequest = createAction('FETCH_MARKETS_REQUEST');
const fetchMarketsSuccess = createAction(
	'FETCH_MARKETS_SUCCESS',
	(data, resp) => [data, resp]
);

const fetchMarketRequest = createAction('FETCH_MARKET_REQUEST');
const fetchMarketSuccess = createAction(
	'FETCH_MARKET_SUCCESS',
	(data, resp) => [data, resp]
);

const updateMinimum = createAction('UPDATE_MINIMUM_BET');
const updateExchangeMatches = createAction(
	'UPDATE_EXCHANGE_MATCHES',
	(data, resp) => [data, resp]
);

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export function fetchMarkets(params, query) {
	return async dispatch => {
		dispatch(fetchMarketsRequest());

		await sleep(0);

		axios({
			method: 'get',
			url: '/v1/exchange',
			params: {
				sport: params.sport,
				competition: params.competition,
				order: query.order,
			},
		})
			.then(resp => {
				dispatch(fetchMarketsSuccess(params, resp));
			})
			.catch(err => {
				dispatch(fetchMarketsSuccess(params, { data: mockMarkets }));
			});
	};
}

export function fetchMarket(data) {
	return dispatch => {
		dispatch(fetchMarketRequest());
		dispatch(fetchMarketSuccess(data, mockMarkets[0]));
	};
}

export function updateMinimumBet(data) {
	return dispatch => {
		dispatch(updateMinimum(data));
	};
}

export function updateExchange(matches, params) {
	return dispatch => {
		dispatch(updateExchangeMatches(params, matches));
	}
}

const initialState = Immutable.Map({
	isLoading: false,
	minimumBet: 0,
	markets: Immutable.Map(),
	activeMarket: Immutable.Map(),
});

const exchangeReducer = createReducer(
	{
		[fetchMarketsRequest]: state => {
			return state.merge({
				isLoading: true,
			});
		},
		[fetchMarketsSuccess]: (state, [data, resp]) => {
			const nestedArray = getNestedMarketsArray(data);
			const oldMarkets = state.get('markets');
			const matches = Immutable.fromJS(resp.data);

			// Merge if market data exists, create new if not
			const newMarkets = oldMarkets.getIn(nestedArray)
				? oldMarkets.mergeIn(nestedArray, matches)
				: oldMarkets.updateIn(nestedArray, (val = matches) => val);

			return state.merge({
				isLoading: false,
				markets: newMarkets,
			});
		},
		[fetchMarketRequest]: state => {
			return state.merge({
				isLoading: true,
			});
		},
		[fetchMarketSuccess]: (state, [data, resp]) => {
			return state.merge({
				isLoading: false,
				activeMarket: Immutable.fromJS(resp),
			});
		},
		[updateMinimum]: (state, data) => {
			return state.merge({
				minimumBet: data,
			});
		},
		[updateExchangeMatches]: (state, [data, resp]) => {
			const nestedArray = getNestedMarketsArray(data);
			const oldMarkets = state.get('markets');
			const matches = Immutable.fromJS(resp);

			// Merge if market data exists, create new if not
			const newMarkets = oldMarkets.getIn(nestedArray)
				? oldMarkets.mergeIn(nestedArray, matches)
				: oldMarkets.updateIn(nestedArray, (val = matches) => val);

			return state.merge({
				markets: newMarkets,
			});
		}
	},
	initialState
);

export default exchangeReducer;

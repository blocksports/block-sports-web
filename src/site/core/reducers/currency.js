import Immutable from 'immutable';
import axios from 'axios';
import { createAction, createReducer } from 'redux-act';
import { mockPrices } from './__mockData';

const fetchPriceRequest = createAction('FETCH_PRICE_REQUEST');
const fetchPriceSuccess = createAction('FETCH_PRICE_SUCCESS', (data, resp) => [
	data,
	resp,
]);

const updateActiveCurrency = createAction('UPDATE_CURRENCY');

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export function fetchPrice(data) {
	return async dispatch => {
		dispatch(fetchPriceRequest());

		await sleep(2000);

		axios({
			method: 'get',
			url: '/v1/currency',
		})
			.then(resp => {
				dispatch(fetchPriceSuccess(data, resp));
			})
			.catch(err => {
				dispatch(fetchPriceSuccess(data, { data: mockPrices }));
			});
	};
}

export function updateCurrency(currency) {
	return dispatch => {
		dispatch(updateActiveCurrency(currency));
	};
}

const initialState = Immutable.Map({
	isLoading: true,
	activeCurrency: 'GAS',
	activeExchangeCurrency: 'USD',
	price: Immutable.Map(),
});

const currencyReducer = createReducer(
	{
		[fetchPriceRequest]: state => {
			return state.merge({
				isLoading: true,
			});
		},
		[fetchPriceSuccess]: (state, [data, resp]) => {
			return state.merge({
				isLoading: false,
				price: resp.data,
			});
		},
		[updateActiveCurrency]: (state, currency) => {
			return state.merge({
				activeCurrency: currency,
			});
		},
	},
	initialState
);

export default currencyReducer;

import { createImmutableSelector } from '../../../lib/selector';
import Immutable from 'immutable';

const getPrices = state => {
	return state.getIn(['core', 'currency', 'price'], Immutable.Map());
};

const getActiveExchangeCurrency = state => {
	return state.getIn(['core', 'currency', 'activeExchangeCurrency']);
};

export const selectExchangeRate = createImmutableSelector(
	getPrices,
	getActiveExchangeCurrency,
	(prices, exchangeCurrency) => {
		console.log(prices, exchangeCurrency)
		return prices.getIn(['GAS', exchangeCurrency], 1);
	}
);

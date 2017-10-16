import { createImmutableSelector } from '../../../lib/selector';
import Immutable from 'immutable';

const getPrices = (state) => {
  return state.getIn(['core', 'currency', 'price'], Immutable.Map());
};

const getActiveCurrency = (state) => {
  return state.getIn(['core', 'currency', 'activeCurrency']);
};

export const selectExchangeRate = createImmutableSelector(
  getPrices,
  getActiveCurrency,
  (prices, currency) => {
    return prices.getIn(['GAS', currency], 1);
  }
);

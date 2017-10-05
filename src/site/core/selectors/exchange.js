import { createImmutableSelector } from '../../../lib/selector';
import { getNestedMarketsArray } from '../../../lib/utils';
import Immutable from 'immutable';

const getExchangeMarkets = (state) => {
  return state.getIn(['core', 'exchange', 'markets'], Immutable.Map());
}

const getParams = (_, props) => {
  return props.params;
}

// const getOrder = (_, props) => {
//   return props.location.query && props.location.query.order;
// }

export const selectMarketItems = createImmutableSelector(
  getExchangeMarkets,
  getParams,
  (markets, params) => {
    const nestedArray = getNestedMarketsArray(params)
    return markets.getIn(nestedArray, Immutable.List());
  }
);

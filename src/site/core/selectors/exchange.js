import { createImmutableSelector } from '../../../lib/selector';
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
    const { sport, entity, entityID } = params;
    var nestArray = []

    if (sport) {
      nestArray.push(sport);
      if (entity) {
        nestArray.push(entity);
        if (entityID) {
          nestArray.push(entityID);
        }
      }
    }
    nestArray.push('items');

    return markets.getIn(nestArray, Immutable.List());
  }
);

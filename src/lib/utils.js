export const getNestedMarketsArray = (params) => {
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
  return nestArray;
}

export const getMarketOrder = (order) => {
  switch (order) {
    case 'time':
      return (a, b) => {
        if (a.get('date') < b.get('date')) return -1;
        if (a.get('date') > b.get('date')) return 1;
        if (a.get('date') === b.get('date')) return 0;
      };
    case 'popular':
      return (a, b) => {
        if (a.get('total_matched') > b.get('total_matched')) return -1;
        if (a.get('total_matched') < b.get('total_matched')) return 1;
        if (a.get('total_matched') === b.get('total_matched')) return 0;
      };
    default:
      return (a, b) => {return 0;};
  }
}

export const round = (value, decimals) => {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

export const roundByMagnitude = (value) => {
  const order = Math.floor(Math.log(value) / Math.LN10 + 0.000000001);
  const magnitude = Math.pow(10, order);
  return Math.round(value / magnitude + 0.000000001) * magnitude || 0;
}

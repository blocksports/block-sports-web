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

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

export const orderByDate = (field, order = 1) => {
  return (a, b) => {
    if (a.get(field) < b.get(field)) return -1 * order;
    if (a.get(field) > b.get(field)) return 1 * order;
    if (a.get(field) === b.get(field)) return 0;
  };
}

export const getMarketOrder = (order) => {
  switch (order) {
    case 'time':
      return orderByDate('time');
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

// TODO: Make nicer
export const calculateMatchPools = (matches) => {
  matches.forEach((match, index) => {
    let pool = 0;
    let backA = match.runner_a.back;
    Object.keys(backA).sort((a, b) => {return b - a}).forEach((key) => {
      pool += backA[key]['available'];
      backA[key].total_available = pool;
      backA[key].odds = key
    });

    pool = 0;
    let layA = match.runner_a.lay;
    Object.keys(layA).sort().forEach((key) => {
      pool += layA[key]['available'];
      layA[key].total_available = pool;
      layA[key].odds = key
    });

    pool = 0;
    let backB = match.runner_b.back;
    Object.keys(backB).sort((a, b) => {return b - a}).forEach((key) => {
      pool += backB[key]['available'];
      backB[key].total_available = pool;
      backB[key].odds = key;
    });

    pool = 0;
    let layB = match.runner_b.lay;
    Object.keys(layB).sort(-1).forEach((key) => {
      pool += layB[key]['available'];
      layB[key].total_available = pool;
      layB[key].odds = key;
    });

    if (!match.draw) return;
    
    pool = 0;
    let backDraw = match.draw.back;
    Object.keys(backDraw).sort((a, b) => {return b - a}).forEach((key) => {
      pool += backDraw[key]['available'];
      backDraw[key].total_available = pool;
      backDraw[key].odds = key
    });

    pool = 0;
    let layDraw = match.draw.lay;
    Object.keys(layDraw).sort().forEach((key) => {
      pool += layDraw[key]['available'];
      layDraw[key].total_available = pool;
      layDraw[key].odds = key
    });
  });
};

export const round = (value, decimals) => {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

export const roundByMagnitude = (value) => {
  const order = Math.floor(Math.log(value) / Math.LN10 + 0.000000001);
  const magnitude = Math.pow(10, order);
  return Math.round(value / magnitude + 0.000000001) * magnitude || 0;
}

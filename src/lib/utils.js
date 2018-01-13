export const getNestedMarketsArray = params => {
	const { sport, competition, match } = params;
	var nestArray = [];

	if (sport) {
		nestArray.push(sport);
		if (competition) {
			nestArray.push(competition);
			if (match) {
				nestArray.push(match);
			}
		}
	}
	nestArray.push('items');
	return nestArray;
};

export const orderByDate = (field, order = 1) => {
	return (a, b) => {
		if (a.get(field) < b.get(field)) return -1 * order;
		if (a.get(field) > b.get(field)) return 1 * order;
		if (a.get(field) === b.get(field)) return 0;
	};
};

export const getMarketOrder = order => {
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
			return (a, b) => {
				return 0;
			};
	}
};

export const round = (value, decimals) => {
	return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
};

export const roundByMagnitude = value => {
	const order = Math.floor(Math.log(value) / Math.LN10 + 0.00001);
	let magnitude = Math.pow(10, order);

	// Need to handle e+x, e-x differently
	if (magnitude < 1) {
		magnitude = 1 / magnitude;
		return Math.round(value * magnitude + 0.00001) / magnitude || 0;
	} else {
		return Math.round(value / magnitude + 0.00001) * magnitude || 0;
	}
};

export const getParticipantName = (item, outcome) => {
	if (item.get('outcomes') == 2) {
		return item.getIn(['participants', outcome]);
	} else {
		switch (outcome) {
			case 0:
				return item.getIn(['participants', 0]);
			case 1:
				return 'Draw';
			case 2:
				return item.getIn(['participants', 1]);
		}
	}
};

export const getMatchName = match => {
	return match.get('name').replace(/([a-zA-Z])[_]([a-zA-Z])/, '$1 vs $2');
};

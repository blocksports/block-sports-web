import sha1 from 'js-sha1';

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
	// Assume e-x
	const magnitude = 1 / Math.pow(10, -1 * decimals);
	
	return Math.round(value * magnitude + 0.00001) / magnitude || 0;
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

export const getGlyphPath = sport => {
	return sport.replace(/[- ]/g, '').toLowerCase();
};

export const confirmBetPaymentMethods = ['NeoLink', 'Manual'].map(i => {
	return {
		value: i.toLowerCase(),
		text: i,
	};
});

export const createConfirmBetPaymentFields = (bet) => {
	const matchID = sha1(bet.get('name'))
	const odds = bet.get('odds')*100;
	const betType = bet.get('type');
	const gasCost = round(bet.get('liability')*100000000, 0)
	let outcome = bet.get('participants').findIndex((e) => {
		return e == bet.get('runner_name');
	});
	if (outcome == -1) {
		outcome = 2
	}

	outcome += 1 
	const arr = [matchID, outcome, odds, betType, gasCost]
	const value = `[ ${arr.join(', ')} ]`;
	
	let fields = confirmBetPaymentFields;
	fields[2].value = value;
	return fields;

}

const confirmBetPaymentFields = [
	{
		label: 'Address',
		type: 'String',
		value: 'AKDVzYGLczmykdtRaejgvWeZrvdkVEvQ1X',
		showCopyClipboard: true,
	},
	{
		label: 'Operation',
		type: 'String',
		value: 'placeBet',
		showCopyClipboard: true,
	},
	{
		label: 'Args',
		type: 'ByteArray',
		value:
			'[ 86f7e437faa5a7fce15d1ddcb9eaeaea377667b8, 1, 150, back, 25000000 ]',
		showCopyClipboard: true,
	},
	{
		label: 'PublicKey',
		type: 'String',
		value: 'Enter your address',
		showCopyClipboard: false,
	},
];

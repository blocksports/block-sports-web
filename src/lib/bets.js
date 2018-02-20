import { round } from './utils';

export const getBetLiability = (
	{ odds, stake, type },
	exchangeRate,
	currency
) => {
	const multiplier = currency === 'GAS' ? 1 : 1 / exchangeRate;
	if (type === 'back') {
		return round(stake * multiplier, 2);
	} else {
		const a = odds * stake - stake;
		return round(a * multiplier, 2);
	}
};

export const getTotalPool = ({ odds, stake, type }) => {
	if (type === 'back') return (odds - 1) * stake;
	return round(stake * 1, 2);
};

export const calculateProfit = (odds, stake) => {
	const profit = (odds - 1) * stake;
	return profit >= 0 ? round(profit, 2) : 0;
};

export const calculateStake = (odds, profit, type) => {
	let stake;
	if (type === 'back') {
		stake = round((profit + profit / (odds - 1)) / odds, 2) || 0;
	} else {
		stake = round(profit / (odds - 1), 2) || 0;
	}
	return !isNaN(stake) ? stake : 0;
};

export const calculateLiability = (odds, profit) => {
	return (odds * profit - profit).toFixed(2) || 0;
};

export const getBetStake = (stake, exchangeRate, currency) => {
	const multiplier = currency === 'GAS' ? 1 : 1 / exchangeRate;
	return round(stake * multiplier, 3);
};

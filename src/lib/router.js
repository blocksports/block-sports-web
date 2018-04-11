import { browserHistory } from 'react-router';

/**
 * @param {Object} query
 */
export const addQuery = query => {
	const location = Object.assign({}, browserHistory.getCurrentLocation());
	Object.assign(location.query, query);
	browserHistory.push(location);
};

/**
 * @param {...String} queryNames
 */
export const removeQuery = (...queryNames) => {
	var location = Object.assign({}, browserHistory.getCurrentLocation());
	var hasChanged = false;

	queryNames.forEach(q => {
		if (location.query[q]) {
			delete location.query[q];
			hasChanged = true;
		} 

		return
	});
	
	if (hasChanged) {
		browserHistory.push(location);
	}
};

export const getQueries = () => {
	const location = Object.assign({}, browserHistory.getCurrentLocation());
	return location.query;
};

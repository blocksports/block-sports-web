'use-strict';

import { getQueries, removeQuery } from '../lib/router';
import sha1 from 'js-sha1';
import { loginUser } from './core/reducers/user';

const createRoutes = store => {
	const requireLogin = (nextState, replace, cb) => {
		const state = store.getState();
		const isLoggedIn = state.getIn(['core', 'user', 'isLoggedIn']);

		if (!isLoggedIn) {
			const queries = getQueries()
			const password = queries.p ? queries.p : '';

			const hash = process.env.APP_SHA_KEY;
			const pass = sha1(password);

			if (hash != pass) {
				replace('login');
			} else {
				removeQuery('p');
				store.dispatch(loginUser(password));
			}
		}

		cb();
	};

	return {
		childRoutes: [
			{
				path: '/',
				onEnter: requireLogin,
				getComponent(nextState, callback) {
					require.ensure([], require => {
						callback(null, require('./core/containers/Root').default);
					});
				},
				getIndexRoute(location, callback) {
					callback(null, {
						onEnter: (nextState, replace) => replace('/exchange'),
					});
				},
				getChildRoutes(location, callback) {
					require.ensure([], function(require) {
						callback(null, [...require('./core/routes')(store)]);
					});
				},
			},
			{
				path: '/login',
				getComponent(nextState, callback) {
					require.ensure([], require => {
						callback(null, require('./core/containers/Login').default);
					});
				},
			}
		],
	};
};

export default createRoutes;

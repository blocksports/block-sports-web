'use-strict';

const createRoutes = store => {
	const requireLogin = (nextState, replace, cb) => {
		const state = store.getState();
		const isLoggedIn = state.getIn(['core', 'user', 'isLoggedIn']);

		if (!isLoggedIn) {
		  replace('login');
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

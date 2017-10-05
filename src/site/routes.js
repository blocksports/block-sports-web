'use-strict'

const createRoutes = (store) => {
  return {
    childRoutes: [
      {
        path: '/',
        getComponent(nextState, callback) {
          require.ensure([], (require) => {
            callback(null, require('./core/containers/Root').default);
          });
        },
        getIndexRoute(location, callback) {
          callback(null, {
            onEnter: (nextState, replace) => replace('/home')
          });
        },
        getChildRoutes(location, callback) {
          require.ensure([], function(require) {
            callback(null, [
              ...require('./core/routes')(store)
            ]);
          });
        }
      }
    ]
  };
};

export default createRoutes;

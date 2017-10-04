module.exports = function(store) {
  return [
    {
      path: 'home',
      getComponent(nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('./containers/Exchange').default);
        });
      },
    },
    {
      path: 'filter/:sport',
      getComponent(nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('./containers/Exchange').default);
        });
      },
    },
    {
      path: 'filter/:sport/:league',
      getComponent(nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('./containers/Exchange').default);
        });
      }
    }
  ];
};

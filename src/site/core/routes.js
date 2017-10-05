module.exports = function(store) {
  return [
    {
      path: 'exchange(/:sport)(/:entity)(/:entityID)',
      getComponent(nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('./containers/Exchange').default);
        });
      }
    }
  ];
};

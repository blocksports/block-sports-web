module.exports = function(store) {
  return [
    {
      path: '/',
      getComponent(nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('./components/Home').default);
        });
      }
    }
  ];
};

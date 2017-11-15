import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import Immutable from 'immutable';
import appReducer from './reducers';
import { isBrowser, isProduction } from '../lib/constants';

export default function configureStore(history, initialState) {
  let finalCreateStore = compose(
    applyMiddleware(thunk),
    applyMiddleware(
      routerMiddleware(history)
    )
  );

  // Create logger
  if (isBrowser && !isProduction) {
    const stateTransformer = (state) => {
      if (state instanceof Immutable.Iterable) {
        return state.toJS();
      } else {
        return state;
      }
    };

    const logger = createLogger({
      stateTransformer
    });

    finalCreateStore = compose(
      finalCreateStore,
      applyMiddleware(logger)
    );
  }

  finalCreateStore = finalCreateStore(createStore);

  return finalCreateStore(appReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}

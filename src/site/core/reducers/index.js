import { combineReducers } from 'redux-immutable';
import userReducer from './user';
import exchangeReducer from './exchange';
import routerReducer from './router';

const coreReducer = combineReducers({
  user: userReducer,
  exchange: exchangeReducer,
  router: routerReducer
});

export default coreReducer;

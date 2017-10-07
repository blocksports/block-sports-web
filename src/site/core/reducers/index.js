import { combineReducers } from 'redux-immutable';
import userReducer from './user';
import exchangeReducer from './exchange';
import navigationReducer from './navigation';
import routerReducer from './router';

const coreReducer = combineReducers({
  user: userReducer,
  exchange: exchangeReducer,
  navigation: navigationReducer,
  router: routerReducer
});

export default coreReducer;

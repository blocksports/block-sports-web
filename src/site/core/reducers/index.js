import { combineReducers } from 'redux-immutable';
import userReducer from './user';
import betReducer from './bet';
import exchangeReducer from './exchange';
import navigationReducer from './navigation';
import routerReducer from './router';

const coreReducer = combineReducers({
  user: userReducer,
  bet: betReducer,
  exchange: exchangeReducer,
  navigation: navigationReducer,
  router: routerReducer
});

export default coreReducer;

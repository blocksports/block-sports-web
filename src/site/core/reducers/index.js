import { combineReducers } from 'redux-immutable';
import userReducer from './user';
import routerReducer from './router';

const coreReducer = combineReducers({
  user: userReducer,
  router: routerReducer
});

export default coreReducer;

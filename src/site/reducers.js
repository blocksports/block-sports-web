import { combineReducers } from 'redux-immutable';
import coreReducer from './core/reducers';

const appReducer = combineReducers({
  core: coreReducer
});

export default appReducer;

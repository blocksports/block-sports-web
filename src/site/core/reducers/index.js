import { combineReducers } from 'redux-immutable';
import userReducer from './user';
import betReducer from './bet';
import currencyReducer from './currency';
import exchangeReducer from './exchange';
import navigationReducer from './navigation';
import routerReducer from './router';
import modalReducer from './modal';
import blockchainReducer from './blockchain';
import notificationsReducer from './notifications';

const coreReducer = combineReducers({
	user: userReducer,
	bet: betReducer,
	currency: currencyReducer,
	exchange: exchangeReducer,
	navigation: navigationReducer,
	router: routerReducer,
	modal: modalReducer,
	blockchain: blockchainReducer,
	notifications: notificationsReducer,
});

export default coreReducer;

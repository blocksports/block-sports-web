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
import cardsReducer from './cards';

const coreReducer = combineReducers({
	bet: betReducer,
	blockchain: blockchainReducer,
	cards: cardsReducer,
	currency: currencyReducer,
	exchange: exchangeReducer,
	modal: modalReducer,
	navigation: navigationReducer,
	notifications: notificationsReducer,
	router: routerReducer,
	user: userReducer,
});

export default coreReducer;

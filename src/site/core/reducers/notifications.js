import Immutable from 'immutable';
import { mockNotifications } from './__mockData';
import { createAction, createReducer } from 'redux-act';

const initialState = Immutable.Map({
	items: Immutable.fromJS(mockNotifications),
});

const notificationsReducer = createReducer({}, initialState);

export default notificationsReducer;

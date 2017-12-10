import Immutable from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux/lib/reducer';
import { createAction, createReducer } from 'redux-act';

// redux-immutable.combineReducers is not inherently compatible with
// react-router-redux routerReducer -> Define our own

const storeLastPathAction = createAction('STORE_LAST_PATH');

export const storeLastPath = path => {
	return dispatch => {
		dispatch(storeLastPathAction(path));
	};
};

const initialState = Immutable.fromJS({
	locationBeforeTransitions: null,
});

const reducer = createReducer(
	{
		[LOCATION_CHANGE]: (state = initialState, payload) => {
			return state.merge({
				locationBeforeTransitions: payload,
			});
		},
		[storeLastPathAction]: (state, path) => {
			return state.merge({
				lastPath: path,
			});
		},
	},
	initialState
);

export default reducer;

import Immutable from 'immutable';
import { createAction, createReducer } from 'redux-act';

const demoLocalStorageKeyName = 'acceptedDemoWarning';
const dempLocalStorageKeyValue = '1';
const fetchUserRequest = createAction('FETCH_USER_REQUEST');
const fetchUserSuccess = createAction('FETCH_USER_SUCCESS');
export const acceptDemoWarning = createAction('ACCEPT_DEMO_WARNING');

export function fetchUser() {
	return dispatch => {
		dispatch(fetchUserRequest());
		dispatch(
			fetchUserSuccess({
				balance: 28.81,
			})
		);
	};
}

const initialState = Immutable.Map({
	isLoading: false,
	isLoggedIn: false,
	user: Immutable.Map(),
	hasAcceptedDemoWarning:
		localStorage.getItem(demoLocalStorageKeyName) === dempLocalStorageKeyValue,
});

const userReducer = createReducer(
	{
		[fetchUserRequest]: (state, resp) => {
			return state.merge({
				isLoading: true,
			});
		},
		[fetchUserSuccess]: (state, resp) => {
			return state.merge({
				isLoading: false,
				user: Immutable.fromJS(resp),
			});
		},
		[acceptDemoWarning]: (state, resp) => {
			localStorage.setItem(demoLocalStorageKeyName, dempLocalStorageKeyValue);
			return state.merge({
				hasAcceptedDemoWarning: true,
			});
		},
	},
	initialState
);

export default userReducer;

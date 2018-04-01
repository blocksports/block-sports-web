import Immutable from 'immutable';
import { createAction, createReducer } from 'redux-act';

const demoLocalStorageKeyName = 'acceptedDemoWarning';
const demoLocalStorageKeyValue = '1';
const fetchUserRequest = createAction('FETCH_USER_REQUEST');
const fetchUserSuccess = createAction('FETCH_USER_SUCCESS');
export const acceptDemoWarning = createAction('ACCEPT_DEMO_WARNING');

export const validateUser = createAction('VALIDATE_USER');

export function fetchUser() {
	return dispatch => {
		dispatch(fetchUserRequest());
		dispatch(
			fetchUserSuccess({
				balance: 50.00,
			})
		);
	};
}

const initialState = Immutable.Map({
	isLoading: false,
	isLoggedIn: false,
	user: Immutable.Map(),
	hasAcceptedDemoWarning:
		localStorage.getItem(demoLocalStorageKeyName) === demoLocalStorageKeyValue,
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
			localStorage.setItem(demoLocalStorageKeyName, demoLocalStorageKeyValue);
			return state.merge({
				hasAcceptedDemoWarning: true,
			});
		},
		[validateUser]: (state, resp) => {
			return state.merge({
				isLoggedIn: true
			})
		}
	},
	initialState
);

export default userReducer;

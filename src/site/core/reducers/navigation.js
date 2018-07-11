import Immutable from 'immutable';
import axios from 'axios';
import { createAction, createReducer } from 'redux-act';

import { mockNavigation } from './__mockData';

const fetchNavigationRequest = createAction('FETCH_NAVIGATION_REQUEST');
const fetchNavigationSuccess = createAction('FETCH_NAVIGATION_SUCCESS');

export function fetchNavigation(data) {
	return async dispatch => {
		dispatch(fetchNavigationRequest());

		axios({
			method: 'get',
			url: '/v1/navigation',
		})
			.then(resp => {
				dispatch(fetchNavigationSuccess(resp.data));
			})
			.catch(err => {
				dispatch(fetchNavigationSuccess({ data: mockNavigation }));
			});
	};
}

const initialState = Immutable.Map({
	isLoading: false,
	navigation: Immutable.List(),
});

const navigationReducer = createReducer(
	{
		[fetchNavigationRequest]: state => {
			return state.merge({
				isLoading: true,
			});
		},
		[fetchNavigationSuccess]: (state, resp) => {
			return state.merge({
				isLoading: false,
				navigation: Immutable.fromJS(resp.data),
			});
		},
	},
	initialState
);

export default navigationReducer;

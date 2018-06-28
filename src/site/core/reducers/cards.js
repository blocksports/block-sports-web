import Immutable from 'immutable';
import axios from 'axios';
import { createAction, createReducer } from 'redux-act';
import { mockCards } from './__mockData';
const fetchCardsRequest = createAction('FETCH_CARDS_REQUEST');
const fetchCardsSuccess = createAction('FETCH_CARDS_SUCCESS');

export function fetchCards(data) {
	return async dispatch => {
		dispatch(fetchCardsRequest());

		axios({
			method: 'get',
			url: '/v1/header?competitions=2018-world-cup,england-premier-league,mlb',
		})
			.then(resp => {
				dispatch(fetchCardsSuccess(resp));
			})
			.catch(err => {
				dispatch(fetchCardsSuccess({ data: mockCards }));
			});
	};
}

const initialState = Immutable.Map({
	isLoading: false,
	items: Immutable.List(),
});

const cardsReducer = createReducer(
	{
		[fetchCardsRequest]: state => {
			return state.merge({
				isLoading: true,
			});
		},
		[fetchCardsSuccess]: (state, resp) => {
			return state.merge({
				isLoading: false,
				items: Immutable.fromJS(resp.data),
			});
		},
	},
	initialState
);

export default cardsReducer;

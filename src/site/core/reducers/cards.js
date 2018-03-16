import Immutable from 'immutable';
import axios from 'axios';
import { createAction, createReducer } from 'redux-act';
import { mockCards } from './__mockData';
const fetchCardsRequest = createAction('FETCH_CARDS_REQUEST');
const fetchCardsSuccess = createAction('FETCH_CARDS_SUCCESS');

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export function fetchCards(data) {
	return async dispatch => {
		dispatch(fetchCardsRequest());
		await sleep(1000);
		axios({
			method: 'get',
			url: '/v1/header?competitions=fifa-wc-2018,nba,super-rugby',
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

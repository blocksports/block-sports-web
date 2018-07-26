import Immutable from 'immutable';
import axios from 'axios';
import { createAction, createReducer } from 'redux-act';
import { mockCards, mockEmptyCards } from './__mockData';
const fetchCardsRequest = createAction('FETCH_CARDS_REQUEST');
const fetchCardsSuccess = createAction('FETCH_CARDS_SUCCESS');

export function fetchCards(data) {
	return async dispatch => {
		dispatch(fetchCardsRequest());

		axios({
			method: 'get',
			url: '/v1/header?competitions=uefa-champions-league,nfl-2018,english-premier-league',
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
			let count = 0;

			// Sort cards so returned items with data are prioritised on the LHS
			let items = resp.data.sort((a, b) => {
				if (a.id == "" && b.id != "") {
					return 1;
				} else if (b.id == "" && a.id != "") {
					return -1;
				} else {
					if (a.id == "" && b.id == "") {
						count++;
					}
					
					return 0;	
				}
			});

			// If all cards don't work only load two placeholder cards
			if (count > 1) {
				items = mockEmptyCards;
			}

			return state.merge({
				isLoading: false,
				items: items,
			});
		},
	},
	initialState
);

export default cardsReducer;

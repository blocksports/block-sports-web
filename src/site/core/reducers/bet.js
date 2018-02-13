import Immutable from 'immutable';
import { createAction, createReducer } from 'redux-act';
import { setCurrentModal } from './modal';

const addToBetSlip = createAction('ADD_TO_BET_SLIP');
const removeFromBetSlip = createAction('REMOVE_FROM_BET_SLIP');
const removeAllFromBetSlip = createAction('REMOVE_ALL_FROM_BET_SLIP');

const placeBetRequest = createAction('PLACE_BET_REQUEST');
const placeBetConfirm = createAction('PLACE_BET_CONFIRM');
const placeBetSuccess = createAction('PLACE_BET_SUCCESS');

const fetchActiveBetsRequest = createAction('FETCH_ACTIVE_BETS_REQUEST');
const fetchActiveBetsSuccess = createAction('FETCH_ACTIVE_BETS_SUCCESS');

export function addBet(data) {
	return dispatch => {
		dispatch(addToBetSlip(data));
	};
}

export function removeBet(data) {
	return dispatch => {
		dispatch(removeFromBetSlip(data));
	};
}

export function removeAllBets() {
	return dispatch => {
		dispatch(removeAllFromBetSlip());
	};
}

export function placeBet(data, slipData) {
	return dispatch => {
		dispatch(placeBetRequest());
		dispatch(placeBetConfirm([data, slipData]));
		dispatch(setCurrentModal('confirmBet'));
	};
}

export function confirmBet() {
	return (dispatch, getState) => {
		const currentState = getState();
		dispatch(
			placeBetSuccess(currentState.getIn(['core', 'bet', 'confirmingBet']))
		);
		dispatch(
			removeBet(
				currentState.getIn(['core', 'bet', 'confirmingBetSlipData']).toJS()
			)
		);
	};
}

export function fetchActiveBets() {
	return dispatch => {
		dispatch(fetchActiveBetsRequest());
		dispatch(fetchActiveBetsSuccess([]));
	};
}

const initialState = Immutable.Map({
	isLoading: false,
	isBetting: false,
	activeBets: Immutable.List(),
	betSlip: Immutable.Map(),
});

const betReducer = createReducer(
	{
		[addToBetSlip]: (state, data) => {
			return state.setIn(
				['betSlip', data.type, data.id],
				Immutable.fromJS(data)
			);
		},
		[removeFromBetSlip]: (state, data) => {
			return state.deleteIn(['betSlip', data.type, data.id]);
		},
		[removeAllFromBetSlip]: state => {
			return state.set('betSlip', Immutable.Map());
		},
		[placeBetRequest]: state => {
			return state.merge({
				isBetting: true,
			});
		},
		[placeBetConfirm]: (state, [data, slipData]) => {
			return state.merge({
				confirmingBet: Immutable.fromJS(data),
				confirmingBetSlipData: slipData,
			});
		},
		[placeBetSuccess]: (state, data) => {
			return state.merge({
				isBetting: false,
				confirmingBet: null,
				confirmingBetSlipData: null,
				activeBets: state.get('activeBets').push(data),
			});
		},
		[fetchActiveBetsRequest]: state => {
			return state.merge({
				isLoading: true,
			});
		},
		[fetchActiveBetsSuccess]: (state, resp) => {
			return state.merge({
				isLoading: false,
				activeBets: Immutable.fromJS(resp),
			});
		},
	},
	initialState
);

export default betReducer;

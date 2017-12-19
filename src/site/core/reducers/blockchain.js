import Immutable from 'immutable';
import axios from 'axios';
import { createAction, createReducer } from 'redux-act';
import { mockPrices } from './__mockData';

const fetchBlockchainRequest = createAction('FETCH_BLOCKCHAIN_REQUEST');
const fetchBlockchainSuccess = createAction('FETCH_BLOCKCHAIN_SUCCESS');
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export function fetchBlockchainInfo() {
	return async dispatch => {
		dispatch(fetchBlockchainRequest());

		await sleep(2000);

		axios({
			method: 'get',
			url: '/v1/blockchain',
		})
			.then(resp => {
				dispatch(fetchBlockchainSuccess(resp.data));
			})
			.catch(err => {
				dispatch(fetchBlockchainSuccess({ data: {} }));
			});
	};
}

const initialState = Immutable.Map({
	isLoading: true,
    averageTime: 0,
    blockHeight: 0,
    lastUpdated: 0
});

const blockchainReducer = createReducer(
	{
		[fetchBlockchainRequest]: state => {
			return state.merge({
				isLoading: true,
			});
		},
		[fetchBlockchainSuccess]: (state, resp) => {
			return state.merge({
                isLoading: false,
                averageTime: resp.average_time,
                blockHeight: resp.block_height,
                lastUpdated: resp.updated_at
			});
		}
	},
	initialState
);

export default blockchainReducer;

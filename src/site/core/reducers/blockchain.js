import Immutable from 'immutable';
import axios from 'axios';
import { createAction, createReducer } from 'redux-act';
import { mockPrices } from './__mockData';

const fetchBlockchainRequest = createAction('FETCH_BLOCKCHAIN_REQUEST');
const fetchBlockchainSuccess = createAction('FETCH_BLOCKCHAIN_SUCCESS');

const updateBlockchain = createAction('UPDATE_BLOCKCHAIN_INFO');

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export function fetchBlockchainInfo() {
	return async dispatch => {
		dispatch(fetchBlockchainRequest());

		await sleep(0);

		axios({
			method: 'get',
			url: '/v1/blockchain',
		})
			.then(resp => {
				dispatch(fetchBlockchainSuccess(resp.data));
			})
			.catch(err => {
				dispatch(fetchBlockchainSuccess({
					average_time: 24,
					block_height: 0,
					updated_at: 1513682132
				}));
			});
	};
}

export function updateBlockchainInfo(data) {
	return dispatch => {
		dispatch(updateBlockchain(data));
	}
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
		},
		[updateBlockchain]: (state, data) => {
			return state.merge({
				averageTime: data.average_time,
                blockHeight: data.block_height,
                lastUpdated: data.updated_at
			});
		}
	},
	initialState
);

export default blockchainReducer;

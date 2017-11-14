import Immutable from 'immutable';
import { createAction, createReducer } from 'redux-act';
import { setCurrentModal } from './modal'


const addToBetSlip = createAction('ADD_TO_BET_SLIP');
const removeFromBetSlip = createAction('REMOVE_FROM_BET_SLIP');
const removeAllFromBetSlip = createAction('REMOVE_ALL_FROM_BET_SLIP');

const placeBetRequest = createAction('PLACE_BET_REQUEST');
const placeBetSuccess = createAction('PLACE_BET_SUCCESS', (data, resp) => [data, resp]);

const fetchActiveBetsRequest = createAction('FETCH_ACTIVE_BETS_REQUEST');
const fetchActiveBetsSuccess = createAction('FETCH_ACTIVE_BETS_SUCCESS');


const mockActiveBets = [
  // {
  //   "id":"00d96f22-f093-4a9d-88fe-04acc9837134",
  //   "type": "back",
  //   "market_id":"1",
  //   "market_name":"Tsering Redmond Jones vs Sergej Stojanovski",
  //   "entity": "competition",
  //   "entity_id":"111",
  //   "entity_name":"A League",
  //   "runner_id":"1111",
  //   "runner_name":"Tsering Redmond Jones",
  //   "odds": 1.5,
  //   "stake": 5.3,
  //   "pool_total": 1.5 * 5.3 - 5.3,
  //   "pool_filled": 1,
  //   "status":"active",
  //   "date_created":1508662589
  // },
  // {
  //   "id":"00d96f22-f093-4a9d-88fe-04acc9837135",
  //   "type": "lay",
  //   "market_id":"2",
  //   "market_name":"Mirren King-Smith vs Sergej Stojanovski",
  //   "entity": "competition",
  //   "entity_id":"111",
  //   "entity_name":"A League",
  //   "runner_id":"1111",
  //   "runner_name":"Mirren King-Smith",
  //   "odds": 1.8,
  //   "stake": 20,
  //   "pool_total": 1.8 * 20 - 20,
  //   "pool_filled": 1.8 * 20 - 20,
  //   "status":"filled",
  //   "date_created":1508663589
  // }
];

export function addBet(data) {
  return (dispatch) => {
    dispatch(addToBetSlip(data));
  }
}

export function removeBet(data) {
  return (dispatch) => {
    dispatch(removeFromBetSlip(data));
  }
}

export function removeAllBets() {
  return (dispatch) => {
    dispatch(removeAllFromBetSlip());
  }
}

export function placeBet(data, slipData) {
  return (dispatch) => {
    dispatch(placeBetRequest());
    dispatch(setCurrentModal('confirmBet'));

    // if (slipData) {
    //   dispatch(removeBet(slipData));
    // }

    // dispatch(placeBetSuccess(data, {}));
  };
}

export function fetchActiveBets() {
  return (dispatch) => {
    dispatch(fetchActiveBetsRequest());
    dispatch(fetchActiveBetsSuccess(mockActiveBets));
  }
}

const initialState = Immutable.Map({
  isLoading: false,
  isBetting: false,
  activeBets: Immutable.List(),
  betSlip: Immutable.Map()
});

const betReducer = createReducer({
  [addToBetSlip]: (state, data) => {
    return state.setIn(['betSlip', data.type, data.id], Immutable.fromJS(data));
  },
  [removeFromBetSlip]: (state, data) => {
    return state.deleteIn(['betSlip', data.type, data.id]);
  },
  [removeAllFromBetSlip]: (state) => {
    return state.set('betSlip', Immutable.Map())
  },
  [placeBetRequest]: (state) => {
    return state.merge({
      isBetting: true
    });
  },
  [placeBetSuccess]: (state, [data, resp]) => {
    return state.merge({
      isBetting: false,
      activeBets: state.get('activeBets').push(Immutable.fromJS(data))
    });
  },
  [fetchActiveBetsRequest]: (state) => {
    return state.merge({
      isLoading: true
    });
  },
  [fetchActiveBetsSuccess]: (state, resp) => {
    return state.merge({
      isLoading: false,
      activeBets: Immutable.fromJS(resp)
    });
  }
}, initialState);

export default betReducer;

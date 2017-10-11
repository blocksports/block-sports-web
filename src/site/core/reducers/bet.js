import Immutable from 'immutable';
import { createAction, createReducer } from 'redux-act';

const placeBetRequest = createAction('PLACE_BET_REQUEST');
const placeBetSuccess = createAction('PLACE_BET_SUCCESS', (data, resp) => [data, resp]);

export function placeBet(data) {
  return (dispatch) => {
    dispatch(placeBetRequest());
    dispatch(placeBetSuccess(data, {}));
  }
}

const initialState = Immutable.Map({
  isLoading: false,
  isBetting: false,
  activeBets: Immutable.List()
});

const betReducer = createReducer({
  [placeBetRequest]: (state) => {
    return state.merge({
      isBetting: true
    });
  },
  [placeBetSuccess]: (state, [data, resp]) => {
    return state.merge({
      isBetting: false,
      activeBets: Immutable.List()
    });
  }
}, initialState);

export default betReducer;

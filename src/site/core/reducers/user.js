import Immutable from 'immutable';
import { createAction, createReducer } from 'redux-act';

const fetchUserRequest = createAction('FETCH_USER_REQUEST');
const fetchUserSuccess = createAction('FETCH_USER_SUCCESS');

export function fetchUser() {
  return (dispatch) => {
    dispatch(fetchUserRequest());
    dispatch(fetchUserSuccess());
  }
}

const initialState = Immutable.Map({
  isLoading: false,
  isLoggedIn: false,
  user: Immutable.Map()
});

const userReducer = createReducer({
  [fetchUserRequest]: (state, payload) => {
    return state.merge({
      isLoading: true
    });
  },
  [fetchUserSuccess]: (state, payload) => {
    return state.merge({
      isLoading: false
    });
  }
}, initialState);

export default userReducer;

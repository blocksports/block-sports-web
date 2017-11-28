import Immutable from 'immutable';
import { createAction, createReducer } from 'redux-act';

export const setCurrentModal = createAction('SET_CURRENT_MODAL');

const initialState = Immutable.Map({
  currentModal: null,
});

const modalReducer = createReducer({
  [setCurrentModal]: (state, resp) => {
    return state.merge({
      currentModal: resp
    });
  },
}, initialState);

export default modalReducer;

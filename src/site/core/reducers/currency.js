import Immutable from 'immutable';
import axios from 'axios';
import { createAction, createReducer } from 'redux-act';

const fetchPriceRequest = createAction('FETCH_PRICE_REQUEST');
const fetchPriceSuccess = createAction('FETCH_PRICE_SUCCESS', (data, resp) => [data, resp]);

const updateActiveCurrency = createAction('UPDATE_CURRENCY');

const mockPrices = {"NEO":{"USD":28.14,"GAS":1.23,"AUD":35.7},"GAS":{"USD":22.79,"GAS":1,"AUD":29.02}};

export function fetchPrice(data) {
  return (dispatch) => {
    dispatch(fetchPriceRequest());

    // axios({
    //   method:'get',
    //   url: 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=NEO,GAS&tsyms=USD,GAS,AUD'
    // })
    // .then((resp) => {
    //   dispatch(fetchPriceSuccess(data, resp));
    // });

    dispatch(fetchPriceSuccess(data, {data: mockPrices}));
  };
}

export function updateCurrency(currency) {
  return (dispatch) => {
    dispatch (updateActiveCurrency(currency));
  };
}

const initialState = Immutable.Map({
  isLoading: false,
  activeCurrency: 'GAS',
  activeExchangeCurrency: 'USD',
  price: Immutable.Map()
});

const currencyReducer = createReducer({
  [fetchPriceRequest]: (state) => {
    return state.merge({
      isLoading: true
    });
  },
  [fetchPriceSuccess]: (state, [data, resp]) => {
    return state.merge({
      isLoading: false,
      price: resp.data
    });
  },
  [updateActiveCurrency]: (state, currency) => {
    return state.merge({
      activeCurrency: currency
    });
  }
}, initialState);

export default currencyReducer;

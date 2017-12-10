import Immutable from 'immutable';
import PropTypes from 'prop-types';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

export const createOptions = initialState => {
	const mockStore = configureStore([thunk]);
	const myStore = mockStore(Immutable.Map(initialState));
	const mockContext = {
		router: {
			push: jest.fn(),
		},
		store: myStore,
	};

	return {
		context: mockContext,
		childContextTypes: {
			store: PropTypes.object,
		},
	};
};

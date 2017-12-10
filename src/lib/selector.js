import Immutable from 'immutable';
import { createSelectorCreator, defaultMemoize } from 'reselect';

export const createImmutableSelector = createSelectorCreator(
	defaultMemoize,
	Immutable.is
);

export default {
	createImmutableSelector,
};

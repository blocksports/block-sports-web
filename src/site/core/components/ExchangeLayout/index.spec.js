import React from 'react';
import { mount } from 'enzyme';
import ExchangeLayout from './';

describe('<ExchangeLayout />', () => {
	it('Should render', () => {
		const root = mount(<ExchangeLayout />);
		expect(root.length).toBe(1);
	});
});

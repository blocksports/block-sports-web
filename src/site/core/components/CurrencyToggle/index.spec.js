import React from 'react';
import { mount } from 'enzyme';
import CurrencyToggle from './';

describe('<CurrencyToggle />', () => {
	it('Should render', () => {
		const root = mount(<CurrencyToggle />);
		expect(root.length).toBe(1);
	});
});

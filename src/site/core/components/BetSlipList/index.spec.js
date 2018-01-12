import React from 'react';
import { mount } from 'enzyme';
import BetSlipList from './';

describe('<BetSlipList />', () => {
	it('Should render', () => {
		const root = mount(<BetSlipList />);
		expect(root.length).toBe(1);
	});
});

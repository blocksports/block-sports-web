import React from 'react';
import { mount } from 'enzyme';
import Bets from './';

describe('<Bets />', () => {
	it('Should render', () => {
		const root = mount(<Bets />);
		expect(root.length).toBe(1);
	});
});

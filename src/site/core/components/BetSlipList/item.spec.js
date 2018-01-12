import React from 'react';
import { mount } from 'enzyme';
import BetSlipListItem from './item';

describe('<BetSlipListItem />', () => {
	it('Should render', () => {
		const root = mount(<BetSlipListItem />);
		expect(root.length).toBe(1);
	});
});

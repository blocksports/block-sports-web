import React from 'react';
import { mount } from 'enzyme';
import ActiveBetListItem from './item';

describe('<ActiveBetListItem />', () => {
	it('Should render', () => {
		const root = mount(<ActiveBetListItem />);
		expect(root.length).toBe(1);
	});
});

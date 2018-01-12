import React from 'react';
import { mount } from 'enzyme';
import ActiveBetList from './';

describe('<ActiveBetList />', () => {
	it('Should render', () => {
		const root = mount(<ActiveBetList />);
		expect(root.length).toBe(1);
	});
});

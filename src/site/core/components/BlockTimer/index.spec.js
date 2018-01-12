import React from 'react';
import { mount } from 'enzyme';
import BlockTimer from './';

describe('<BlockTimer />', () => {
	it('Should render', () => {
		const root = mount(<BlockTimer />);
		expect(root.length).toBe(1);
	});
});

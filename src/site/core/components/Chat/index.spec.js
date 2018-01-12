import React from 'react';
import { mount } from 'enzyme';
import Chat from './';

describe('<Chat />', () => {
	it('Should render', () => {
		const root = mount(<Chat />);
		expect(root.length).toBe(1);
	});
});

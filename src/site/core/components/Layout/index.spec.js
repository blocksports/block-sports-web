import React from 'react';
import { mount } from 'enzyme';
import Layout from './';

describe('<Layout />', () => {
	it('Should render', () => {
		const root = mount(<Layout />);
		expect(root.length).toBe(1);
	});
});

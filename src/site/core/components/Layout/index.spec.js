jest.mock('../../containers/Header', () => 'Header');
jest.mock('../../containers/Navigation', () => 'Navigation');

import React from 'react';
import Immutable from 'immutable';

import { mount } from 'enzyme';

import Layout from './';

describe('<Layout />', () => {
	it('Should render', () => {
		const root = mount(<Layout />);
		expect(root.length).toBe(1);
	});
});

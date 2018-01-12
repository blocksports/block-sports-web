import React from 'react';
import { mount } from 'enzyme';
import Currencies from './';

describe('<Currencies />', () => {
	it('Should render', () => {
		const root = mount(<Currencies />);
		expect(root.length).toBe(1);
	});
});

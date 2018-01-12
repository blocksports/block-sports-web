import React from 'react';
import { mount } from 'enzyme';
import Button from './';

describe('<Button />', () => {
	it('Should render', () => {
		const root = mount(<Button />);
		expect(root.length).toBe(1);
	});
});

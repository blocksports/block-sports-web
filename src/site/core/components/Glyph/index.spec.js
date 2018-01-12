import React from 'react';
import { mount } from 'enzyme';
import Glyph from './';

describe('<Glyph />', () => {
	it('Should render', () => {
		const root = mount(<Glyph />);
		expect(root.length).toBe(1);
	});
});

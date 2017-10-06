import React from 'react';
import Immutable from 'immutable';

import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import Layout from './';

const minProps = {

};

describe('<Layout />', () => {
  it('Should', () => {
    const root = mount(<Layout />);
  });
});

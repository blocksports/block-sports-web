jest.mock('../../containers/Header', () => 'Header');

import React from 'react';
import Immutable from 'immutable';

import { mount } from 'enzyme';

import Layout from './';

const minProps = {

};

describe('<Layout />', () => {
  it('Should', () => {
    const root = mount(<Layout />);
  });
});

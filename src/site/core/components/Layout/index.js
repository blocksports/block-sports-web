import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { Link } from 'react-router';

import Header from '../../containers/Header/index.js';

import styles from './style.less';

class Layout extends Component {

  get header() {
    return (
      <div className="header">
        <Header/>
      </div>
    );
  }

  render() {
    return (
      <div className={styles.root}>
        {this.header}
        {this.props.children}
      </div>
    );
  }
}

export default Layout;

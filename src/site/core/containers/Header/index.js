import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import { Link, IndexLink } from 'react-router';
import classNames from 'classnames';
import { t } from 'i18next';

import styles from './style.less';

import Logo from '../../../../img/header-logo.png';

class Header extends Component {
  constructor(props, context) {
    super(props, context);
  }

  get logo() {
    return (
        <IndexLink to="/" >
          <img className="header-logo-img panel" src={Logo}/>
        </IndexLink>
    );
  }

  get content() {
    return (
      <div className="header-content panel">
      </div>
    );
  }

  render() {
    return (
      <div className={styles.root}>
        {this.logo}
        {this.content}
      </div>
    );
  }
}

Header.propTypes = {
  path: PropTypes.string.isRequired,
  user: PropTypes.instanceOf(Immutable.Map)
};

const mapStateToProps = (state) => {
  return {
    'isLoggedIn': state.getIn(['core', 'user', 'isLoggedIn']),
    'path': state.getIn(['core', 'router', 'locationBeforeTransitions', 'pathname'])
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

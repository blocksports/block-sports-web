import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import classNames from 'classnames';
import { t } from 'i18next';

import styles from './style.less';

class Header extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className={styles.root}>
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

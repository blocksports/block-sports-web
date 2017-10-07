import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import { Link, IndexLink } from 'react-router';
import { fetchNavigation } from '../../reducers/navigation';
import classNames from 'classnames';
import { t } from 'i18next';

import styles from './style.less';

class Navigation extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    this.props.fetchNavigation();
  }

  render() {
    console.log(this.props);
    return (
      <div className={styles.root}>
      </div>
    );
  }
}

Navigation.propTypes = {
  items: PropTypes.instanceOf(Immutable.List).isRequired
};

const mapStateToProps = (state) => {
  return {
    'items': state.getIn(['core', 'navigation', 'navigation']),
    'path': state.getIn(['core', 'router', 'locationBeforeTransitions', 'pathname'])
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNavigation: (...args) => {
      return dispatch(fetchNavigation(...args));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);

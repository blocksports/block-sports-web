import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { t } from 'i18next';

import styles from './style.less';

export class Markets extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      activeTab: 'time'
    };

    this.handleTabClick = this.handleTabClick.bind(this);
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {

  }



  get tabs() {
    return (
      <div className="market-header">
        <ul className="tabs">
          <li className={this.tabClass('time')}><a className="tab" onClick={this.handleTabClick('time')}>Starting Soon</a></li>
          <li className={this.tabClass('popular')}><a className="tab" onClick={this.handleTabClick('popular')}>Popular</a></li>
        </ul>
      </div>
    );
  }

  tabClass(tab) {
    return classNames(['tab-item', {'is-active': tab == this.state.activeTab}]);
  }

  handleTabClick(tab) {
    return () => {
      this.setState({activeTab: tab});
    }
  }

  render() {
    return (
      <div className={styles.root}>
        {this.tabs}
      </div>
    );
  }
}

Markets.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Markets);

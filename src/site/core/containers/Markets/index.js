import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { t } from 'i18next';

import MarketList from '../../components/MarketList';

import styles from './style.less';

export class Markets extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      activeOrder: 'time'
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
          <li className={this.tabClass('time')}><a className="tab-link" onClick={this.handleTabClick('time')}>{t('core:markets.header-time')}</a></li>
          <li className={this.tabClass('popular')}><a className="tab-link" onClick={this.handleTabClick('popular')}>{t('core:markets.header-popular')}</a></li>
        </ul>
      </div>
    );
  }

  tabClass(tab) {
    return classNames(['tab-item', {'is-active': tab == this.state.activeOrder}]);
  }

  handleTabClick(tab) {
    return () => {
      this.setState({activeOrder: tab});
    }
  }

  render() {
    return (
      <div className={styles.root}>
        {this.tabs}
        <div className="market-body">
          <MarketList
            order={this.state.activeOrder}
            items={this.props.items}
            />
        </div>
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

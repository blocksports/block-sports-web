import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import classNames from 'classnames';
import { t } from 'i18next';
import { Tabs, Tab } from '../Tabs'
import BetSlip from '../../containers/BetSlip';
import ActiveBets from '../../containers/ActiveBets';
import styles from './style.less';

class Bets extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      activeTab: 'active'
    };

    this.handleTabClick = this.handleTabClick.bind(this);
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  get tabs() {
    return (
      <Tabs>
        <Tab className={this.tabClass('bet-slip')} onClick={this.handleTabClick('bet-slip')}>{t('core:bets.bet-slip-tab')}</Tab>
        <Tab className={this.tabClass('active')} onClick={this.handleTabClick('active')}>{t('core:bets.active-tab')}</Tab>
      </Tabs>
    );
  }

  displayClass(tab) {
    return classNames({'is-active': tab === this.state.activeTab, 'is-inactive': tab !== this.state.activeTab});
  }

  tabClass(tab) {
    return classNames([{'active': tab == this.state.activeTab}]);
  }

  handleTabClick(tab) {
    return () => {
      this.setState({activeTab: tab});
    };
  }

  render() {
    return (
      <div className={styles.root}>
        {this.tabs}
        <div className={styles.content}>
          <BetSlip
            className={this.displayClass('bet-slip')}
            focusTab={this.handleTabClick('bet-slip')}
            isActive={this.state.activeTab == 'bet-slip'}
            />
          <ActiveBets
            className={this.displayClass('active')}
            focusTab={this.handleTabClick('active')}
            isActive={this.state.activeTab == 'active'}
            />
        </div>
      </div>
    );
  }
}

Bets.propTypes = {
};

export default Bets;

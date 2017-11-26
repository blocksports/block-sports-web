import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { t } from 'i18next';
import { selectExchangeRate } from '../../selectors/currency';
import { addBet } from '../../reducers/bet';
import MarketList from '../../components/MarketList';
import { Tabs, Tab } from '../../components/Tabs';
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
      <Tabs className={styles.tabs}>
        <Tab className={this.tabClass('time')} onClick={this.handleTabClick('time')}><i className="fa fa-clock-o" aria-hidden="true"/>{t('core:markets.header-time')}</Tab>
        <Tab className={this.tabClass('popular')} onClick={this.handleTabClick('popular')}><i className="fa fa-star-o" aria-hidden="true"/>{t('core:markets.header-popular')}</Tab>
      </Tabs>
    );
  }

  tabClass(tab) {
    return classNames([tab == this.state.activeOrder ? 'active' : null]);
  }

  handleTabClick(tab) {
    return () => {
      this.setState({
        activeOrder: tab
      });
    };
  }

  render() {
    return (
      <div>
        {this.tabs}
        <div className={styles.body}>
          <MarketList
            order={this.state.activeOrder}
            items={this.props.items}
            currency={this.props.activeCurrency}
            exchangeRate={this.props.exchangeRate}
            onOddsClick={this.props.addBet}
            minimumBet={this.props.minimumBet}
          />
        </div>
      </div>
    );
  }
}

Markets.propTypes = {
};

const mapStateToProps = (state) => {
  return {
    'activeCurrency': state.getIn(['core', 'currency', 'activeCurrency']),
    'exchangeRate': selectExchangeRate(state),
    'minimumBet': state.getIn(['core', 'exchange', 'minimumBet'])
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addBet: (...args) => {
      return dispatch(addBet(...args));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Markets);

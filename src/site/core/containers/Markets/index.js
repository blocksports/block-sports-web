import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { t } from 'i18next';
import { selectExchangeRate } from '../../selectors/currency';
import { placeBet } from '../../reducers/bet';
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
          <li className={this.tabClass('time')}><a className="tab-link" onClick={this.handleTabClick('time')}><i className="fa fa-clock-o" aria-hidden="true"/>{t('core:markets.header-time')}</a></li>
          <li className={this.tabClass('popular')}><a className="tab-link" onClick={this.handleTabClick('popular')}><i className="fa fa-star-o" aria-hidden="true"/>{t('core:markets.header-popular')}</a></li>
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
            currency={this.props.activeCurrency}
            exchangeRate={this.props.exchangeRate}
            onConfirmBet={this.props.placeBet}
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
    'exchangeRate': selectExchangeRate(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    placeBet: (...args) => {
      return dispatch(placeBet(...args));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Markets);

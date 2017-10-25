import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { t } from 'i18next';

import Bets from '../Bets';
import Navigation from '../../containers/Navigation';
import Markets from '../../containers/Markets';
import MarketDetail from '../../containers/MarketDetail';
import ExchangeFooter from '../../containers/ExchangeFooter';
import styles from './style.less';

class ExchangeLayout extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {

  }

  get contentLeft() {
    return (
      <div className="exchange-content-left panel">
        <Navigation
          sport={this.props.params.sport}
          />
      </div>
    );
  }

  get contentRight() {
    return (
      <div className="exchange-content-right">
        <div className="exchange-content-right-top panel">
          <Bets/>
        </div>
        <div className="exchange-content-right-bottom panel">

        </div>
      </div>
    );
  }

  get contentMiddle() {
    return (
      <div className="exchange-content-middle">
        <div className="exchange-content-middle-top panel">
        </div>
        <div className="exchange-content-middle-bottom panel">
          {this.marketView}
        </div>
      </div>
    );
  }

  get marketView() {
    if (this.props.params.entity === 'market') {
      return (
        <MarketDetail
          params={this.props.params}
          />
      );
    }

    return (
      <Markets
        items={this.props.items}
        />
    );
  }

  get content() {
    return (
      <div className="exchange-content">
        {this.contentLeft}
        {this.contentMiddle}
        {this.contentRight}
      </div>
    );
  }

  render() {
    return (
      <div className={styles.root}>
        {this.content}
        <ExchangeFooter className="exchange-footer panel"/>
      </div>
    );
  }
}

ExchangeLayout.propTypes = {
  params: PropTypes.object,
  query: PropTypes.object,
  items: PropTypes.instanceOf(Immutable.List).isRequired
};

export default ExchangeLayout;

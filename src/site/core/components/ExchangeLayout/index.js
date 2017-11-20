import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { t } from 'i18next';

import Bets from '../Bets';
import Chat from '../Chat';
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
      <div className={styles.left}>
        <Navigation
          sport={this.props.params.sport}
          />
      </div>
    );
  }

  get contentRight() {
    return (
      <div className={styles.right}>
        <Bets className={styles.bets} />
        <div className={styles.chat}>
          <Chat />
        </div>
      </div>
    );
  }

  get contentMiddle() {
    return (
      <div className={styles.main}>
        <figure className={styles.mainMedia}>
        </figure>
        <div className={styles.mainMarket}>
          {this.marketView}
        </div>
      </div>
    );
  }

  get marketView() {
    const { params, items } = this.props
    if (params.entity === 'market') {
      return <MarketDetail params={params} />
    } else {
      return <Markets items={items} />
    }
  }

  render() {
    return (
      <div>
        <div className={styles.root}>
          {this.contentLeft}
          {this.contentMiddle}
          {this.contentRight}
        </div>
        <ExchangeFooter className={styles.footer}/>
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

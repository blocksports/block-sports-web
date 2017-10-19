import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { t } from 'i18next';
import { getMarketOrder } from '../../../../lib/utils';
import { dateTime, dateTypes } from '../../../../lib/dateTime';
import moment from 'moment';
import MarketListItem from './item';

import styles from './style.less';

class MarketList extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  get renderItems() {
    let items = this.props.items;

    items = items.sort(getMarketOrder(this.props.order));

    let itemArray = [];
    let lastDate = '';

    items.forEach((item, idx) => {
      const date = moment.unix(item.get('date')).format('D');
      if (date != lastDate) {
        lastDate = date;
        itemArray.push(this.renderDateRow(item.get('date'), idx));
      }

      itemArray.push(
        <MarketListItem
          key={idx}
          item={item}
          onConfirmBet={this.props.onConfirmBet}
          currency={this.props.currency}
          exchangeRate={this.props.exchangeRate}
          minimumBet={this.props.minimumBet}
          />
      );
    });

    return itemArray;
  }

  renderDateRow(date, key) {
    return (
      <div className="date-row" key={`date-${key}`}>
        {dateTime(date, dateTypes.dayMonthDate)}
      </div>
    );
  }

  render() {
    return (
      <div className={styles.root}>
        {this.renderItems}
      </div>
    );
  }
}

MarketList.propTypes = {
  onConfirmBet: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  exchangeRate: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  minimumBet: PropTypes.number.isRequired
};

export default MarketList;

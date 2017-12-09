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

  get renderItemsByDate() {
    let items = this.props.items;

    let itemArray = [];
    let lastDate = '';

    items.forEach((item, idx) => {
      const date = moment.unix(item.get('commence')).format('D');
      // Inject date row if there is a new day
      if (date != lastDate) {
        lastDate = date;
        itemArray.push(this.renderDateRow(item.get('commence'), idx));
      }

      itemArray.push(
        <MarketListItem
          key={idx}
          item={item}
          onConfirmBet={this.props.onConfirmBet}
          currency={this.props.currency}
          exchangeRate={this.props.exchangeRate}
          minimumBet={this.props.minimumBet}
          showDetail={this.props.showDetail}
          onOddsClick={this.props.onOddsClick}
        />
      );
    });

    return itemArray;
  }

  get renderItemsBySport() {
    let items = this.props.items;
    
        let itemArray = [];
        let lastSport = '';
    
        items.forEach((item, idx) => {
          const sport = item.get('sport');
          // Inject sport row if there is a new sport
          if (sport != lastSport) {
            lastSport = sport;
            itemArray.push(this.renderSportRow(sport, idx));
          }
    
          itemArray.push(
            <MarketListItem
              key={idx}
              item={item}
              onConfirmBet={this.props.onConfirmBet}
              currency={this.props.currency}
              exchangeRate={this.props.exchangeRate}
              minimumBet={this.props.minimumBet}
              showDetail={this.props.showDetail}
              onOddsClick={this.props.onOddsClick}
            />
          );
        });
    
        return itemArray;
  }

  renderDateRow(date, key) {
    return (
      <span className={styles.dateHeading} key={`date-${key}`}>
        {dateTime(date, dateTypes.dayMonthDate)}
      </span>
    );
  }

  renderSportRow(sport, key) {
    return (
      <span className={styles.dateHeading} key={`sport-${key}`}>
        {t(`core:sport.${sport}`)}
      </span>
    );
  }
  render() {

    if (this.props.items.isEmpty()) return null;

    return (
      <div className={styles.root}>
        {this.props.isFrontPage ? this.renderItemsBySport : this.renderItemsByDate}
      </div>
    );
  }
}

MarketList.propTypes = {
  onConfirmBet: PropTypes.func,
  exchangeRate: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  minimumBet: PropTypes.number.isRequired,
  items: PropTypes.instanceOf(Immutable.List),
  showDetail: PropTypes.bool,
  isFrontPage: PropTypes.bool,
  onOddsClick: PropTypes.func,
};

MarketList.defaultProps = {
  showDetail: false
}

export default MarketList;

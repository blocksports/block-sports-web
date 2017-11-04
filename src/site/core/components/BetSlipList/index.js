import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import classNames from 'classnames';
import { t } from 'i18next';
import BetSlipItem from './item';
import Button from '../Button';
import styles from './style.less';

class BetSlipList extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  get removeAll() {
    if (this.isEmpty('back') && this.isEmpty('lay')) return null;

    return (
      <div className="remove-all">
        {t('core:bets.bet-slip.remove-all')}
        <Button
          className={styles.removeAllButton}
          onClick={this.props.onRemoveAllClick}
        >
          <i className="fa fa-times" aria-hidden="true"/>
        </Button>
      </div>
    );
  }

  isEmpty(type) {
    return this.props.items.get(type, Immutable.Map()).isEmpty();
  }

  renderBets(type) {
    if (this.isEmpty(type)) return;

    return (
      <div className={`bet-slip-${type}`}>
        {this.renderHeader(type)}
        {this.renderRows(type, this.props.items.get(type))}
      </div>
    );
  }

  renderHeader(type) {
    return (
      <div className={classNames(["bet-slip-header", styles.rowFormat])}>
        <div className="runner column">{t(`core:bets.bet-slip.runner-${type}`)}</div>
        <div className="odds column">{t('core:bets.bet-slip.odds')}</div>
        <div className="stake column">{t('core:bets.bet-slip.stake')}</div>
        <div className="profit column">{t(`core:bets.bet-slip.profit-${type}`)}</div>
        <div className="type column"></div>
      </div>
    );
  }

  renderRows(type, items) {
    const itemList = items.toList();

    return itemList.map((bet, index) => {
      return (
        <BetSlipItem
          item={bet}
          exchangeRate={this.props.exchangeRate}
          currency={this.props.currency}
          key={index}
          type={type}
          onBetClick={this.props.onBetClick}
          onRemoveClick={this.props.onRemoveClick}
          />
      );
    });
  }

  render() {
    return (
      <div className={classNames([styles.root, this.props.className])}>
        {this.renderBets('back')}
        {this.renderBets('lay')}
        {this.removeAll}
      </div>
    );
  }
}

BetSlipList.propTypes = {
  className: PropTypes.string,
  items: PropTypes.instanceOf(Immutable.Map).isRequired,
  exchangeRate: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  onBetClick: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  onRemoveAllClick: PropTypes.func.isRequired
};

export default BetSlipList;

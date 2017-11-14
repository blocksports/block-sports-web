import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { t } from 'i18next';
import classNames from 'classnames';
import uuid from 'uuid/v4';
import moment from 'moment';
import { browserHistory } from 'react-router';
import { dateTime, dateTypes } from '../../../../lib/dateTime';
import { round } from '../../../../lib/utils';
import SpinBox from '../SpinBox';
import Button from '../Button';
import styles from './style.less';

const getBetLiability = (state) => {
  const { odds, stake, type } = state;

  if (type === 'back') {
    return stake;
  } else {
    return (odds * stake)
  }
}

const getTotalPool = (state) => {
  const { odds, stake, type } = state;

  if (type === 'back') {
    return (odds - 1) * stake;
  } else {
    return stake;
  }
}

class MarketListItem extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      activeOption: "",
      odds: "",
      limit: "",
      stake: "",
      type: ""
    };

    this.handleOddsClick = this.handleOddsClick.bind(this);
    this.handleConfirmClick = this.handleConfirmClick.bind(this);
    this.handleMarketClick = this.handleMarketClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.item.get('id') != nextProps.item.get('id')) {
      this.resetState();
    }
  }

  get contentLeft() {
    const date = this.props.item.get('date');

    return (
      <div className="market-item-side left"  onClick={this.handleMarketClick}>
        <div className="side-content">
          <span className="day">
            {dateTime(date, dateTypes.calendarDay)}
          </span>
          <span className="time">
            {dateTime(date, dateTypes.time)}
          </span>
        </div>
      </div>
    );
  }

  get contentRight() {
    return (
      <div className="market-item-side">
        <div className="side-content">
          <span className="matched">
            {t('core:markets.item.matched')}
          </span>
          <span className="pool">
            {round(this.props.item.get('total_matched') * this.exchangeRate, 2)}&nbsp;{t(`core:currency.${this.props.currency}`)}
          </span>
          <span className="rules">
            {t('core:markets.item.rules')}&nbsp;>
          </span>
        </div>
      </div>
    );
  }

  get contentMiddle() {
    return (
      <div className="market-item-middle">
        {this.renderRunnerRows(this.props.item.get('runner_a'))}
        {this.drawRow}
        {this.renderRunnerRows(this.props.item.get('runner_b'))}
        {this.showDraw ? this.renderRunnerRows(this.props.item.get('draw')) : null}
      </div>
    );
  }

  get drawRow() {
    if (!this.props.showDetail) return null;

    return this.renderRunnerRows(this.props.item.get('draw'));
  }

  get exchangeRate() {
    return this.props.currency === 'GAS' ? 1 : this.props.exchangeRate;
  }

  get showDraw() {
    return false;
  }

  getFilteredBets(type, bets) {
    const order = {'back': -1, 'lay': 1};
    const limit = !this.props.showDetail ? 1 : 3;
    const orderedBets = bets.sortBy((_, key) => key * order[type]);

    let oddsArray = [];
    let temp = 0;
    let tempKey = undefined;

    orderedBets.forEach((odd, key) => {
      const matched = odd.get('available');
      if (matched  > temp) {
        temp = matched;
        tempKey = key;
      }

      if (matched < (this.props.minimumBet / this.exchangeRate) || oddsArray.length >= limit) return;
      oddsArray.push(odd);
    });

    if (oddsArray.length < 1) oddsArray.push(orderedBets.get(tempKey));

    return oddsArray;
  };

  getProfit(odds, stake) {
    return Math.round(((odds * stake + 0.00001) - stake) * 1000) / 1000 || 0;
  }

  getBetID(runner) {
    return `${runner.get('market_id')}-${runner.get('runner_id')}`;
  }

  handleOddsClick(runner, bet, type) {
    return (event) => {
      event.stopPropagation();

      if (this.props.showDetail && this.props.onOddsClick) {
        return this.props.onOddsClick({
          id: this.getBetID(runner),
          bet: bet,
          runner: runner,
          item: this.props.item,
          type: type
        });
      }

      this.setState({
        activeOption: runner.get('runner_id'),
        odds: bet.get('odds'),
        limit: bet.get('matched'),
        stake: "",
        type: type
      });
    };
  }

  handleConfirmClick(runner) {
    return () => {

      // data wouldn't normally be generated here
      this.props.onConfirmBet({
        id: uuid(),
        type: this.state.type,
        market_id: runner.get('market_id'),
        market_name: this.props.item.get('name'),
        entity: this.props.item.get('entity'),
        entity_id: this.props.item.get('entity_id'),
        entity_name: this.props.item.get('entity_name'),
        runner_id: runner.get('runner_id'),
        runner_name: runner.get('name'),
        odds: this.state.odds,
        stake: this.state.stake,
        pool_total: getTotalPool(this.state),
        liability: getBetLiability(this.state),
        pool_filled: 0,
        status: 'pending',
        date_created: moment().unix()
      });

      this.resetState();
    }
  }

  handleMarketClick() {
    const link = `/exchange/${this.props.item.get('sport')}/market/${this.props.item.get('id')}`;

    browserHistory.push(link);
  }

  handleInputChange(type) {
    return (value) => {
      this.setState({
        [type]: value
      });
    };
  }

  renderRunnerRows(runner) {
    return (
      <div className={styles.runnerRow}>
        <div className="market-item-row"  onClick={this.handleMarketClick}>
          <div className="market-item-row-detail">
            {runner.get('name')}
          </div>
          <div className="market-item-row-actions">
            <div className="bet-buttons">{this.renderBetButtons(runner, 'back')}</div>
            <div className="bet-buttons">{this.renderBetButtons(runner, 'lay')}</div>
          </div>
        </div>
        {this.renderBetRow(runner)}
      </div>
    );
  }

  renderBetRow(runner) {
    if (this.state.activeOption !== runner.get('runner_id')) return null;

    return (
      <div className="market-item-row bet">
        <div className="market-item-row-detail">
          {t('core:markets.item.bet-for')}
        </div>
        <div className="market-item-row-actions">
          <div className="action action-odds">
            {t('core:markets.item.odds')}:
            <SpinBox
              value={this.state.odds}
              onChange={this.handleInputChange('odds')}
            />
          </div>
          <div className="action action-bet">
            {t('core:markets.item.bet')}:
            <SpinBox
              value={this.state.stake}
              onChange={this.handleInputChange('stake')}
            />
          </div>
          <div className="action action-profit">
            {t('core:markets.item.profit')}:
            <span className="action-profit-amount">{this.getProfit(this.state.odds, this.state.stake)}</span>
          </div>
          <div className="action action-confirm">
            <Button
              className={styles.confirmButton}
              onClick={this.handleConfirmClick(runner)}
              // isDisabled={!this.state.stake}
              >
              {t('core:markets.item.confirm')}
            </Button>
          </div>
      </div>
      </div>
    );
  }

  renderBetButtons(runner, type) {
    let bets = this.getFilteredBets(type, runner.get(type));

    let betArray = [];

    bets.forEach((bet, idx) => {
      betArray.push(
        <div className={`bet-button bet-button-${type}`} key={idx}>
          {this.renderBetButton(runner, bet, type)}
        </div>
      );
    });

    while (this.props.showDetail && betArray.length < 3) {
      betArray.push(
        <div className="bet-button bet-button-empty" key={betArray.length}>
          <Button
            className={classNames([styles.oddsButton, 'btn-empty'])}
            onClick={this.handleOddsClick(runner, Immutable.Map(), type)}
            />
        </div>
      );
    }

    if (type === 'back') betArray.reverse();

    return betArray;
  }

  renderBetButton(runner, bet, type) {
    return (
      <Button
        className={classNames([styles.oddsButton, `btn-${type}`])}
        onClick={this.handleOddsClick(runner, bet, type)}
        >
        <div className="odds">
          {bet.get('odds')}
        </div>
        <div className="matched">
          {round(bet.get('available') * this.exchangeRate, 2)} {t(`core:currency.${this.props.currency}`)}
        </div>
      </Button>
    );
  }

  resetState() {
    this.setState({
      activeOption: "",
      odds: "",
      limit: "",
      stake: "",
      type: ""
    });
  }

  render() {
    if (this.props.item.isEmpty()) return null;

    return (
      <div className={styles.itemRoot}>
        {this.contentLeft}
        {this.contentMiddle}
        {this.contentRight}
      </div>
    );
  }
}

MarketListItem.propTypes = {
  item: PropTypes.instanceOf(Immutable.Map).isRequired,
  showDetail: PropTypes.bool.isRequired,
  onConfirmBet: PropTypes.func,
  exchangeRate: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  minimumBet: PropTypes.number.isRequired,
  onOddsClick: PropTypes.func
};

MarketListItem.defaultProps = {
  showDetail: false,
  exchangeRate: 1,
  currency: 'GAS'
}

export default MarketListItem;

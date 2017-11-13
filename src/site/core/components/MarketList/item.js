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
      available: "",
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
    const date = this.props.item.get('commence');

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
            {round(this.props.item.get('matched') * this.exchangeRate, 2)}&nbsp;{t(`core:currency.${this.props.currency}`)}
          </span>
          <span className="rules">
            {t('core:markets.item.rules')}&nbsp;>
          </span>
        </div>
      </div>
    );
  }

  get contentMiddle() {
    // Only have up to 3 outcomes at the moment
    if (this.props.item.get('outcomes') == 2) {
      return (
        <div className="market-item-middle">
          {this.renderMarketRow(0)}
          {this.renderMarketRow(1)}
        </div>
      );
    } else {
      return (
        <div className="market-item-middle">
          {this.renderMarketRow(0)}
          {this.renderMarketRow(1, true)}
          {this.renderMarketRow(2)}
        </div>
      );
    }
  }

  get exchangeRate() {
    return this.props.currency === 'GAS' ? 1 : this.props.exchangeRate;
  }

  get showDraw() {
    return false;
  }

  // Filters bets based on the minimum available pre-matched
  getFilteredBets(type, bets) {
    if (!bets) return [];

    const limit = !this.props.showDetail ? 1 : 3;

    let oddsArray = [];
    let temp = 0;
    let tempIndex = undefined;

    bets.forEach((odd, index) => {
      const available = odd.get('available');
      // Keep track of largest available amount incase no odds fulfil filter
      if (available  > temp) {
        temp = available;
        tempIndex = index;
      }

      if (available < (this.props.minimumBet / this.exchangeRate) || oddsArray.length >= limit) return;
      oddsArray.push(odd);
    });

    if (oddsArray.length < 1) oddsArray.push(bets.get(tempIndex));

    return oddsArray;
  };

  getProfit(odds, stake) {
    return Math.round(((odds * stake + 0.00001) - stake) * 1000) / 1000 || 0;
  }

  getBetID(outcome) {
    return `${this.props.item.get('id')}-${outcome}`;
  }

  handleOddsClick(outcome, bet, type) {
    return (event) => {
      event.stopPropagation();

      if (this.props.showDetail && this.props.onOddsClick) {
        return this.props.onOddsClick({
          id: this.getBetID(outcome),
          bet: bet,
          outcome: outcome,
          item: this.props.item,
          type: type
        });
      }

      this.setState({
        activeOption: outcome,
        odds: bet.get('odds'),
        available: bet.get('available'),
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

  renderMarketRow(outcome, isDraw) {
    // Account for mismatched array lengths
    const participantIndex = outcome > 0 ? 1 : 0;
    const name = isDraw ? "Draw" : this.props.item.getIn(['participants', participantIndex]);

    return (
      <div className={styles.runnerRow}>
        <div className="market-item-row"  onClick={this.handleMarketClick}>
          <div className="market-item-row-detail">
            {name}
          </div>
          <div className="market-item-row-actions">
            <div className="bet-buttons">{this.renderBetButtons(outcome, 'back')}</div>
            <div className="bet-buttons">{this.renderBetButtons(outcome, 'lay')}</div>
          </div>
        </div>
        {this.renderBetRow(outcome)}
      </div>
    );
  }

  renderBetRow(outcome) {
    if (this.state.activeOption !== outcome) return null;

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
              onClick={this.handleConfirmClick(outcome)}
              isDisabled={!this.state.stake}
              >
              {t('core:markets.item.confirm')}
            </Button>
          </div>
      </div>
      </div>
    );
  }

  renderBetButtons(outcome, type) {
    let bets = this.getFilteredBets(type, this.props.item.getIn(['match_odds', type, outcome])) || Immutable.List();

    let betArray = [];

    bets.forEach((bet, idx) => {
      betArray.push(
        <div className={`bet-button bet-button-${type}`} key={idx}>
          {this.renderBetButton(outcome, bet, type)}
        </div>
      );
    });

    while (this.props.showDetail && betArray.length < 3) {
      betArray.push(
        <div className="bet-button bet-button-empty" key={betArray.length}>
          <Button
            className={classNames([styles.oddsButton, 'btn-empty'])}
            onClick={this.handleOddsClick(outcome, Immutable.Map(), type)}
            />
        </div>
      );
    }

    if (type === 'back') betArray.reverse();

    return betArray;
  }

  renderBetButton(outcome, bet, type) {
    console.log(bet)
    return (
      <Button
        className={classNames([styles.oddsButton, `btn-${type}`])}
        onClick={this.handleOddsClick(outcome, bet, type)}
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

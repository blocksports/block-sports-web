import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { t } from 'i18next';
import classNames from 'classnames';
import { dateTime, dateTypes } from '../../../../lib/dateTime';
import SpinBox from '../SpinBox';
import Button from '../Button';
import styles from './style.less';


class MarketListItem extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      activeOption: "",
      odds: "",
      limit: "",
      stake: ""
    };

    this.handleOddsClick = this.handleOddsClick.bind(this);
    this.handleConfirmClick = this.handleConfirmClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.item.get('id') != nextProps.item.get('id')) {
      this.setState({
        activeOption: "",
        odds: "",
        limit: "",
        stake: ""
      });
    }
  }

  get contentLeft() {
    const date = this.props.item.get('date');

    return (
      <div className="market-item-side">
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
            {this.props.item.get('total_matched')}&nbsp;{t('core:currency.gas')}
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
        {this.renderRunnerRows(this.props.item.get('runner_b'))}
        {this.showDraw ? this.renderRunnerRows(this.props.item.get('draw')) : null}
      </div>
    );
  }

  get showDraw() {
    return false;
  }

  handleOddsClick(option, bet) {
    return () => {
      this.setState({
        activeOption: option,
        odds: bet.get('odds'),
        limit: bet.get('matched'),
        stake: ""
      });
    };
  }

  handleConfirmClick(runner) {
    return () => {
      this.props.onConfirmBet(runner);
    }
  }

  handleInputChange(type) {
    return (value) => {
      this.setState({
        [type]: value
      });
    };
  }

  getProfit(odds, stake) {
    return Math.round(((odds * stake + 0.00001) - stake) * 1000) / 1000 || 0;
  }

  renderRunnerRows(runner) {
    return (
      <div className={styles.runnerRow}>
        <div className="market-item-row">
          <div className="market-item-row-detail">
            {runner.get('name')}
          </div>
          <div className="market-item-row-actions">
            {this.renderBetButton(runner.get('option'), runner.getIn(['back', 0]), 'back')}
            {this.renderBetButton(runner.get('option'), runner.getIn(['lay', 0]), 'lay')}
          </div>
        </div>
        {this.renderBetRow(runner)}
      </div>
    );
  }

  renderBetRow(runner) {
    if (this.state.activeOption !== runner.get('option')) return null;

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
              maximum={this.state.limit}
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
              isDisabled={!this.state.stake}
              >
              {t('core:markets.item.confirm')}
            </Button>
          </div>
      </div>
      </div>
    );
  }

  renderBetButton(option, bet, type) {
    return (
      <Button
        className={classNames([styles.oddsButton, `btn-${type}`])}
        onClick={this.handleOddsClick(option, bet)}
        >
        <div className="odds">
          {bet.get('odds')}
        </div>
        <div className="matched">
          {bet.get('matched')} {t('core:currency.gas')}
        </div>
      </Button>
    );
  }

  render() {
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
  isList: PropTypes.bool.isRequired,
  onConfirmBet: PropTypes.func.isRequired
};

MarketListItem.defaultProps = {
  isList: true
}

class BetBlock extends Component {
  render() {
    return (
      <a className={styles.blockRoot}>

      </a>
    );
  }
}

export default MarketListItem;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import classNames from 'classnames';
import moment from 'moment';
import uuid from 'uuid/v4'
import { t } from 'i18next';
import ReactTooltip from 'react-tooltip';
import SpinBox from '../SpinBox';
import Button from '../Button';
import styles from './style.less';

const getBetLiability = ({ odds, stake, type }) => {
  if (type === 'back') return stake;
  return (odds * stake).toFixed(2)
}

const getTotalPool = ({ odds, stake, type }) => {
  if (type === 'back') return (odds - 1) * stake;
  return stake.toFixed(2)
}

const calculateProfit = (odds, stake) => {
  // const profit = Math.round(((odds * stake + 0.00001) - stake) * 1000) / 1000 || 0
  const profit = (odds - 1) * stake
  return profit >= 0 ? profit.toFixed(2) : 0
}

const calculateStake = (odds, profit) => {
  return ((profit + (profit / (odds-1))) / odds).toFixed(2) || 0
}

const calculateLiability = (odds, profit) => {
  return ((profit + (profit / (odds-1))) / odds).toFixed(2) || 0
}

class BetSlipItem extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      id: props.item.get('id'),
      type: props.item.get('type'),
      odds: props.item.getIn(['bet', 'odds']),
      stake: '0.00',
      liability: '0.00',
    };

    this.handleBetClick = this.handleBetClick.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.handleOddsChange = this.handleOddsChange.bind(this)
    this.handleStakeChange = this.handleStakeChange.bind(this)
    this.handleProfitChange = this.handleProfitChange.bind(this)
    this.handleLiabilityChange = this.handleLiabilityChange.bind(this)
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.item.equals(nextProps.item)) {
      this.setState({
        odds: nextProps.item.getIn(['bet', 'odds']),
        id: nextProps.item.get('id'),
        type: nextProps.item.get('type')
      });
    }

    if (this.props.currency !== nextProps.currency) {
      const multiplier = nextProps.currency !== 'GAS' ? nextProps.exchangeRate : 1/nextProps.exchangeRate;

      this.setState({
        stake: (this.state.stake * multiplier).toFixed(2)
      });
    }
  }

  get isDisabled() {
    return (!this.state.stake || this.state.stake <= 0) || (!this.state.odds || this.state.odds <= 0);
  }

  handleOddsChange(odds) {
    this.setState({
      odds,
      profit: calculateProfit(odds, this.state.stake),
    })
  }

  handleStakeChange(stake) {
    this.setState({
      stake,
      profit: calculateProfit(parseFloat(this.state.odds), parseFloat(stake)),
      liability: calculateLiability(parseFloat(this.state.odds), parseFloat(stake))
    })
  } 

  handleProfitChange(profit) {
    this.setState({
      profit,
      stake: calculateStake(parseFloat(this.state.odds), parseFloat(profit))
    })
  }

  handleLiabilityChange(value) {
    this.setState({
      liability: getBetLiability(this.state)
    })
  }

  handleBetClick(match, runner) {
    return () => {
      this.props.onBetClick({
        id: uuid(),
        type: this.props.type,
        market_id: runner.get('market_id'),
        market_name: match.get('name'),
        entity: match.get('entity'),
        entity_id: match.get('entity_id'),
        entity_name: match.get('entity_name'),
        runner_id: runner.get('runner_id'),
        runner_name: runner.get('name'),
        odds: this.state.odds,
        stake: this.state.stake,
        pool_total: getTotalPool(this.state),
        liability: getBetLiability(this.state),
        pool_filled: 0,
        status: 'pending',
        date_created: moment().unix()
        },
        {
          id: this.state.id,
          type: this.state.type
        }
      );
    };
  }

  handleRemoveClick() {
    this.props.onRemoveClick({
      id: this.state.id,
      type: this.state.type
    });
  }

  renderRunnerTooltip(match) {
    return (
      <ReactTooltip id={match.get('id')} place="bottom" effect="solid" type="light" delayShow={500} delayHide={200} className={styles.tooltip}>
        <div className="runner-tooltip-entity">{match.get('entity_name')}</div>
        <div>{match.get('name')}</div>
      </ReactTooltip>
    );
  }

  render() {
    const match = this.props.item.get('item');
    const runner = this.props.item.get('runner');
    const { type, currency } = this.props
    return (
      <article className={classNames([styles.itemRoot, type])}>
        
        <header className={styles.header} data-tip data-for={match.get('id')}>
          <div className={styles.headerTop}>
            <span className={styles.headerTitle}>{this.props.item.getIn(['runner', 'name'])}</span>
            <div>
              <Button className={classNames([styles.removeButton, 'button-minimal', 'button-m', 'button-square'])} onClick={this.handleRemoveClick}>
                <i className="fa fa-times" aria-hidden="true"/>
              </Button>
            </div>
          </div>
          <span className={styles.headerSub}>{match.get('name')}</span>
        </header>

        {/*{this.renderRunnerTooltip(match)}*/}

        <div className={styles.details}>
          
          <div className={styles.detailsItem}>
            <div className={styles.detailsHeading}>
              <span>Odds</span>
            </div>
            <SpinBox value={this.state.odds} onChange={this.handleOddsChange} />
          </div>

          <div className={styles.detailsItem}>
            <div className={styles.detailsHeading}>
              <span>Stake</span>
              <span className={styles.detailsHeadingCurrency}>{currency}</span>
            </div>
            <SpinBox value={this.state.stake} onChange={this.handleStakeChange} />
          </div>

          {type === 'back' &&
            <div className={styles.detailsItem}>
              <div className={styles.detailsHeading}>
                <span>Profit</span>
                <span className={styles.detailsHeadingCurrency}>{currency}</span>
              </div>
              <SpinBox value={this.state.profit} onChange={this.handleProfitChange} />
            </div>
          }
          
          {type === 'lay' &&
            <div className={styles.detailsItem}>
              <div className={styles.detailsHeading}>
                <span>Liability</span>
               <span className={styles.detailsHeadingCurrency}>{currency}</span>
              </div>
              <SpinBox value={this.state.liability} onChange={this.handleLiabilityChange} />
            </div>
          }

          <div className={styles.detailsBet}>
            <Button
              className={classNames([styles.betButton, 'button-s', `button-${type}`])}
              onClick={this.handleBetClick(match, runner)}
              isDisabled={this.isDisabled}
            >
              {t(`core:bets.bet-slip.button-${type}`)}
            </Button>
          </div>

        </div>

      </article>
    );
  }
}

BetSlipItem.propTypes = {
  className: PropTypes.string,
  item: PropTypes.instanceOf(Immutable.Map).isRequired,
  exchangeRate: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default BetSlipItem;

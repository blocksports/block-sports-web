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

class BetSlipItem extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      odds: props.item.getIn(['bet', 'odds']),
      stake: "",
      id: props.item.get('id'),
      type: props.item.get('type')
    };

    this.handleBetClick = this.handleBetClick.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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

  get profit() {
    return (this.state.odds * this.state.stake).toFixed(2) || 0;
  }

  handleInputChange(field) {
    return (value) => {
      this.setState({
        [field]: value
      });
    };
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

    return (
      <div className={classNames([styles.listItem, this.props.type])}>
        
        <div className={styles.runner} data-tip data-for={match.get('id')}>
          <span className={styles.runnerName}>{this.props.item.getIn(['runner', 'name'])}</span>
          <span className={styles.runnerMarket}>{match.get('name')}</span>
        </div>

        {this.renderRunnerTooltip(match)}

        <div class={styles.details}>

          <div className={styles.detailsItem}>
            <span className={styles.detailsHeading}>Odds</span>
            <SpinBox
              value={this.state.odds}
              onChange={this.handleInputChange('odds')}
              placeholder={0}
            />
          </div>

          <div className={styles.detailsItem}>
            <span className={styles.detailsHeading}>Stake</span>
            <SpinBox
              value={this.state.stake}
              onChange={this.handleInputChange('stake')}
              placeholder={0}
            />
            {/*<span className={styles.currency}>{t(`core:currency.${this.props.currency}`)}</span>*/}
          </div>

          <div className={styles.detailsItem}>
            <span className={styles.detailsHeading}>Profit</span>
            <span className={styles.profitAmount}>{this.profit} {t(`core:currency.${this.props.currency}`)}</span>
          </div>

        </div>

        <div className={styles.actions}>
          <div>
            <Button
              className={classNames([styles.betButton, 'button-s', `button-${this.props.type}`])}
              onClick={this.handleBetClick(match, runner)}
              isDisabled={this.isDisabled}
            >
              {t(`core:bets.bet-slip.button-${this.props.type}`)}
            </Button>
          </div>
          <div>
            <Button
              className={classNames([styles.removeButton, 'button-minimal', 'button-m', 'button-square'])}
              onClick={this.handleRemoveClick}
            >
              <i className="fa fa-times" aria-hidden="true"/>
            </Button>
          </div>
        </div>

      </div>
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

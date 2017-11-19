import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import classNames from 'classnames';
import { t } from 'i18next';
import ReactTooltip from 'react-tooltip';
import { orderByDate } from '../../../../lib/utils';
import styles from './style.less';

class ActiveBetList extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  get header() {
    return (
      <div className="active-bet-header">
        <div className="runner column"></div>
        <div className="odds column">{t('core:bets.active.odds')}</div>
        <div className="matched column">{t('core:bets.active.matched')}</div>
        <div className="profit column">PROFIT</div>
        <div className="status column">{t('core:bets.active.status')}</div>
      </div>
    );
  }

  get activeBets() {
    let items = this.props.items;

    items = items.sort(orderByDate('date_created', -1));

    return items.map((bet, index) => {
      const matched = (bet.get('pool_filled')* this.exchangeRate).toFixed(1);
      const totalMatched = (bet.get('pool_total') * this.exchangeRate).toFixed(1);
      const profit = ((parseInt(bet.get('pool_total')) + parseInt(bet.get('stake')) + parseInt(bet.get('liability'))) * this.exchangeRate).toFixed(1);

      return (
        <li key={index} className={classNames([styles.listItem, bet.get('type')])}>
          
          {this.renderStatus(bet.get('status'), bet)}

          {this.renderStatusTooltip(bet)}

          <div className={styles.runner} data-tip data-for={bet.get('id')}>
            <span className={styles.runnerName}>{bet.get('runner_name')}</span>
            <span className={styles.runnerMarket}>{bet.get('market_name')}</span>
          </div>

          {this.renderRunnerTooltip(bet)}

          <div className={styles.details}>
            <div className={styles.detailsOdds}>
              <span className={styles.detailsHeading}>Odds</span>
              <span className={styles.detailsItem}>{bet.get('odds')}</span>
            </div>
            <div className={styles.detailsMatched}>
              <span className={styles.detailsHeading}>Matched</span>
              <span className={styles.detailsItem}>{matched} / {totalMatched}</span>
            </div>
            <div className={styles.detailsProfit}>
              <div className={styles.detailsHeading}>Profit</div>
              <span className={styles.detailsItem}>{profit} {t(`core:currency.${this.props.currency}`)}</span>
            </div>
          </div>

        </li>
      );
    });
  }

  get exchangeRate() {
    return this.props.currency === 'GAS' ? 1 : this.props.exchangeRate;
  }

  renderRunnerTooltip(bet) {
    return (
      <ReactTooltip id={bet.get('id')} place="left" effect="solid" type="light" delayShow={500} delayHide={200} className={styles.tooltip}>
        <div className="runner-tooltip-entity">{bet.get('entity_name')}</div>
        <div>{bet.get('market_name')}</div>
      </ReactTooltip>
    );
  }

  renderStatusTooltip(bet) {
    return (
      <ReactTooltip id={`${bet.get('id')}-status`} place="left" effect="solid" type="light" delayShow={500} delayHide={200} className={styles.tooltip}>
        <div className="status-tooltip">{t(`core:bets.active.${bet.get('status')}-info`)}</div>
      </ReactTooltip>
    );
  }

  renderStatus(status, bet) {
    return (
      <span className={classNames(styles.statusBlock, status)} data-tip data-for={`${bet.get('id')}-status`}>
        {t(`core:bets.active.${status}`)}
      </span>
    );
  }

  render() {
    return (
      <div className={classNames([styles.root, this.props.className])}>
        <ul className={styles.list}>
          {this.activeBets}
        </ul>
      </div>
    );
  }
}

ActiveBetList.propTypes = {
  className: PropTypes.string,
  items: PropTypes.instanceOf(Immutable.List).isRequired,
  exchangeRate: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
};

export default ActiveBetList;

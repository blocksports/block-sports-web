import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import classNames from 'classnames';
import { t } from 'i18next';
import ToolTip from 'react-portal-tooltip';
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
        <div className="status column">{t('core:bets.active.status')}</div>
      </div>
    );
  }

  get activeBets() {
    let items = this.props.items;

    items = items.sort(orderByDate('date_created', -1));

    return items.map((bet, index) => {
      const matched = (bet.get('pool_filled')* this.exchangeRate).toFixed(1);
      const percentMatched = Math.round(((matched / (bet.get('pool_total') * this.exchangeRate))*100));

      return (
        <div key={index} className="active-bet-row">
          <div className="runner column" data-tip data-for={bet.get('id')}><i className={`fa fa-circle-o type-icon type-icon-${bet.get('type')}`} aria-hidden="true"/>{bet.get('runner_name')}</div>
          {this.renderRunnerTooltip(bet)}
          <div className="odds column">{bet.get('odds')}</div>
          <div className="matched column"><span className="matched-amount">{matched}</span><span className="matched-percent">{percentMatched}%</span></div>
          <div className="status column" data-tip data-for={`${bet.get('id')}-status`}>{this.renderStatus(bet.get('status'))}</div>
          {this.renderStatusTooltip(bet)}
        </div>
        );
    });
  }

  get exchangeRate() {
    return this.props.currency === 'GAS' ? 1 : this.props.exchangeRate;
  }

  renderRunnerTooltip(bet) {
    return (
      <ReactTooltip id={bet.get('id')} place="bottom" effect="solid" type="light" delayShow={500} delayHide={200} className={styles.tooltip}>
        <div className="runner-tooltip-entity">{bet.get('entity_name')}</div>
        <div>{bet.get('market_name')}</div>
      </ReactTooltip>
    );
  }

  renderStatusTooltip(bet) {
    return (
      <ReactTooltip id={`${bet.get('id')}-status`} place="bottom" effect="solid" type="light" delayShow={500} delayHide={200} className={styles.tooltip}>
        <div className="status-tooltip">{t(`core:bets.active.${bet.get('status')}-info`)}</div>
      </ReactTooltip>
    );
  }

  renderStatus(status) {
    return (
      <div className={`status-block status-block-${status}`}>
        {t(`core:bets.active.${status}`)}
      </div>
    );
  }

  render() {
    return (
      <div className={classNames([styles.root, this.props.className])}>
        {this.header}
        <div className="active-bet-items">
          {this.activeBets}
        </div>
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

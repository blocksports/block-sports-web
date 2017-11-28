import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import classNames from 'classnames';
import { t } from 'i18next';
import ReactTooltip from 'react-tooltip';
import { orderByDate } from '../../../../lib/utils';
import styles from './style.less';
import SpinBox from '../SpinBox'


class ActiveBetListItem extends Component {
  constructor(props) {
    super(props);
    const odds = props.bet.get('odds')
    const stake = props.bet.get('stake')
    this.state = {
      odds,
      stake,
      profit: (odds - 1) * stake,
      matched: 0,
    }
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

  render() {
  	const { bet, currency } = this.props;
  	const status = bet.get('status');
  	const type = bet.get('type');
    return (
      <article className={classNames([styles.itemRoot, type])}>
      	
      	<header className={styles.header} data-tip data-for={bet.get('id')}>
      		<div className={styles.headerTop}>
        		<span className={styles.headerTitle}>{bet.get('runner_name')}</span>
        		<div>
        			<span className={classNames(styles.status, status)}>{t(`core:bets.active.${status}`)}</span>
        		</div>
        	</div>
          <span className={styles.headerSub}>{bet.get('market_name')}</span>
        </header>

        <div className={styles.details}>
          
          <div className={styles.detailsItem}>
            <div className={styles.detailsHeading}>
              <span>Odds</span>
            </div>
            <span class={styles.detailsValue}>{this.state.odds}</span>
          </div>

          <div className={styles.detailsItem}>
            <div className={styles.detailsHeading}>
              <span>Stake</span>
              <span className={styles.detailsCurrency}>{currency}</span>
            </div>
            <span class={styles.detailsValue}>{this.state.stake}</span>
          </div>

          {type === 'back' &&
            <div className={styles.detailsItem}>
              <div className={styles.detailsHeading}>
                <span>Profit</span>
                <span className={styles.detailsCurrency}>{currency}</span>
              </div>
              <span class={styles.detailsValue}>{this.state.profit}</span>
            </div>
          }
          
          {type === 'lay' &&
            <div className={styles.detailsItem}>
              <div className={styles.detailsHeading}>
                <span>Liability</span>
                <span className={styles.detailsCurrency}>{currency}</span>
              </div>
              <span class={styles.detailsValue}>{this.state.matched}</span>
            </div>
          }

          <div className={styles.detailsItem}>
            <div className={styles.detailsHeading}>
              <span>Matched</span>
            </div>
            <span class={styles.detailsValue}>{this.state.matched}</span>
          </div>

        </div>

      </article>
    );
  }
}

ActiveBetListItem.propTypes = {
  // className: PropTypes.string,
  // items: PropTypes.instanceOf(Immutable.List).isRequired,
  // exchangeRate: PropTypes.number.isRequired,
  // currency: PropTypes.string.isRequired,
};

export default ActiveBetListItem;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import classNames from 'classnames';
import { t } from 'i18next';
import ReactTooltip from 'react-tooltip';
import { getParticipantName, getMatchName } from '../../../../lib/utils';
import styles from './style.less';
import SpinBox from '../SpinBox';
import Status from '../Status';

class ActiveBetListItem extends Component {
	constructor(props) {
		super(props);
		const odds = parseFloat(props.bet.get('odds'));
		const stake = parseFloat(props.bet.get('stake'));
		this.state = {
			odds,
			stake,
			profit: this.getProfit(odds, stake),
			layLiability: this.getLayLiability(odds, stake),
			matched: 0,
		};
	}

	getProfit(odds, stake) {
		const profit = (odds - 1) * stake;
		return profit >= 0 ? profit.toFixed(2) : 0;
	}

	getLayLiability(odds, stake) {
		return (odds * stake).toFixed(2);
	}

	get exchangeRate() {
		return this.props.currency === 'GAS' ? 1 : this.props.exchangeRate;
	}

	render() {
		const { bet, currency } = this.props;
		const type = bet.get('type');
		return (
			<article className={classNames([styles.itemRoot, type])}>
				<header className={styles.header}>
					<div className={styles.headerInfo}>
						<div className={styles.heading}>
							<span>{bet.get('runner_name')}</span>
						</div>
						<div className={styles.headingSub}>
							<span>{getMatchName(bet)}</span>
						</div>
					</div>
					<div className={styles.headerStatus}>
						<Status status={bet.get('status')} />
					</div>
				</header>
				<div className={styles.details}>
					<div className={styles.detailsItem}>
						<div className={styles.detailsHeading}>
							<span>Odds</span>
						</div>
						<span className={styles.detailsValue}>{this.state.odds}</span>
					</div>
					<div className={styles.detailsItem}>
						<div className={styles.detailsHeading}>
							<span>Stake</span>
							<span className={styles.detailsCurrency}>{currency}</span>
						</div>
						<span className={styles.detailsValue}>{this.state.stake}</span>
					</div>
					{type === 'back' && (
						<div className={styles.detailsItem}>
							<div className={styles.detailsHeading}>
								<span>Profit</span>
								<span className={styles.detailsCurrency}>{currency}</span>
							</div>
							<span className={styles.detailsValue}>{this.state.profit}</span>
						</div>
					)}
					{type === 'lay' && (
						<div className={styles.detailsItem}>
							<div className={styles.detailsHeading}>
								<span>Liability</span>
								<span className={styles.detailsCurrency}>{currency}</span>
							</div>
							<span className={styles.detailsValue}>
								{this.state.layLiability}
							</span>
						</div>
					)}
					<div className={styles.detailsItem}>
						<div className={styles.detailsHeading}>
							<span>Matched</span>
						</div>
						<span className={styles.detailsValue}>{this.state.matched}</span>
					</div>
				</div>
			</article>
		);
	}
}

ActiveBetListItem.propTypes = {
	bet: PropTypes.instanceOf(Immutable.Map).isRequired,
	exchangeRate: PropTypes.number.isRequired,
	currency: PropTypes.string.isRequired,
};

export default ActiveBetListItem;

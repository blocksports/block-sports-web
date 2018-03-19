import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import classNames from 'classnames';
import moment from 'moment';
import uuid from 'uuid/v4';
import { t } from 'i18next';
import Glyph from '../Glyph';
import SpinBox from '../SpinBox';
import Button from '../Button';
import styles from './style.less';
import { getParticipantName, getMatchName, round } from '../../../../lib/utils';
import {
	getBetLiability,
	getTotalPool,
	calculateProfit,
	calculateStake,
	calculateLiability,
	getBetStake,
} from '../../../../lib/bets';

class BetSlipItem extends Component {
	constructor(props, context) {
		super(props, context);

		let odds = props.item.getIn(['bet', 'odds']);
		if (odds < 1.01) {
			odds = 1.01;
		}

		this.state = {
			id: props.item.get('id'),
			type: props.item.get('type'),
			odds: odds,
			stake: '0.00',
			profit: '0.00',
			liability: '0.00',
		};

		this.handleBetClick = this.handleBetClick.bind(this);
		this.handleRemoveClick = this.handleRemoveClick.bind(this);
		this.handleOddsChange = this.handleOddsChange.bind(this);
		this.handleStakeChange = this.handleStakeChange.bind(this);
		this.handleProfitChange = this.handleProfitChange.bind(this);
		this.handleLiabilityChange = this.handleLiabilityChange.bind(this);
	}

	componentWillMount() {}

	componentWillReceiveProps(nextProps) {
		if (!this.props.item.equals(nextProps.item)) {
			this.setState({
				odds: nextProps.item.getIn(['bet', 'odds']),
				id: nextProps.item.get('id'),
				type: nextProps.item.get('type'),
			});
		}

		if (this.props.currency !== nextProps.currency) {
			const multiplier =
				nextProps.currency !== 'GAS'
					? nextProps.exchangeRate
					: 1 / nextProps.exchangeRate;

			this.setState({
				stake: round(this.state.stake * multiplier, 2),
				liability: round(this.state.liability * multiplier, 2),
				profit: round(this.state.profit * multiplier, 2),
			});
		}
	}

	get isDisabled() {
		return (
			!this.state.stake ||
			this.state.stake <= 0 ||
			(!this.state.odds || this.state.odds <= 0)
		);
	}

	handleOddsChange(odds) {

		const odds_i = parseFloat(odds);
		const stake_i = parseFloat(this.state.stake);
		const profit_i = calculateProfit(odds_i, stake_i);

		if (odds_i < 1.00) odds = '1.01';

		const profit = profit_i.toString();
		const liability = profit;

		this.setState({
			odds,
			profit,
			liability
		});
	}

	handleStakeChange(stake) {
		const stake_i = parseFloat(stake);
		const odds_i = parseFloat(this.state.odds);
		const profit_i = calculateProfit(odds_i, stake_i);
		const liability_i = calculateLiability(odds_i, stake_i);

		const profit = profit_i.toString();
		const liability = liability_i.toString();

		this.setState({
			stake,
			profit,
			liability
		});
	}

	handleProfitChange(profit) {
		const profit_i = parseFloat(profit);
		const odds_i = parseFloat(this.state.odds);
		const stake_i = calculateStake(odds_i, profit_i, 'back');

		const stake = stake_i.toString()

		this.setState({
			profit,
			stake
		});
	}

	handleLiabilityChange(liability) {
		const liability_i = parseFloat(liability);
		const odds_i = parseFloat(this.state.odds);
		const stake_i = calculateStake(odds_i, liability_i, 'lay');

		const stake = stake_i.toString()

		this.setState({
			liability,
			stake
		});
	}

	handleBetClick(match, outcome) {
		return () => {
			const { stake, exchangeRate, currency } = this.props;
			this.props.onBetClick(
				{
					id: uuid(),
					type: this.props.type,
					odds: round(this.state.odds, 3),
					stake: getBetStake(this.state.stake, exchangeRate, currency),
					status: 'pending',
					date_created: moment().unix(),
					...match.toObject(),
					status: 'pending',
					runner_name: getParticipantName(match, outcome),
					pool_total: getTotalPool(this.state),
					liability: getBetLiability(this.state, exchangeRate, currency),
					pool_filled: 0,
				},
				{
					id: this.state.id,
					type: this.state.type,
				}
			);
		};
	}

	handleRemoveClick() {
		this.props.onRemoveClick({
			id: this.state.id,
			type: this.state.type,
		});
	}

	render() {
		const match = this.props.item.get('match');
		const outcome = this.props.item.get('outcome');
		const { type, currency } = this.props;
		return (
			<article className={classNames([styles.itemRoot, type])}>
				<header className={styles.header}>
					<div className={styles.heading}>
						<span>{getParticipantName(match, outcome)}</span>
					</div>
					<div>
						<Button
							size="medium"
							extras={['minimal', 'square']}
							className={styles.removeButton}
							onClick={this.handleRemoveClick}>
							<Glyph size="14" icon="close" />
						</Button>
					</div>
					<div className={styles.headingSub}>
						<span>{getMatchName(match)}</span>
					</div>
				</header>
				<div className={styles.details}>
					<div className={styles.detailsItem}>
						<div className={styles.detailsHeading}>
							<span>Odds</span>
						</div>
						<SpinBox
							value={this.state.odds}
							onChange={this.handleOddsChange}
							spinAmount={0.1}
							decimals={2}
						/>
					</div>

					<div className={styles.detailsItem}>
						<div className={styles.detailsHeading}>
							<span>Stake</span>
							<span className={styles.detailsCurrency}>{currency}</span>
						</div>
						<SpinBox
							value={this.state.stake}
							onChange={this.handleStakeChange}
							spinAmount={1}
							decimals={2}
						/>
					</div>

					{type === 'back' && (
						<div className={styles.detailsItem}>
							<div className={styles.detailsHeading}>
								<span>Profit</span>
								<span className={styles.detailsCurrency}>{currency}</span>
							</div>
							<SpinBox
								value={this.state.profit}
								onChange={this.handleProfitChange}
								spinAmount={1}
								decimals={2}
							/>
						</div>
					)}

					{type === 'lay' && (
						<div className={styles.detailsItem}>
							<div className={styles.detailsHeading}>
								<span>Liability</span>
								<span className={styles.detailsCurrency}>{currency}</span>
							</div>
							<SpinBox
								value={this.state.liability}
								onChange={this.handleLiabilityChange}
								spinAmount={1}
								decimals={2}
							/>
						</div>
					)}

					<div className={styles.detailsBet}>
						<Button
							size="small"
							extras={[type]}
							className={styles.betButton}
							onClick={this.handleBetClick(match, outcome)}
							isDisabled={this.isDisabled}>
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
	type: PropTypes.string.isRequired,
};

export default BetSlipItem;

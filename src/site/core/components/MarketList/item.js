import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { t } from 'i18next';
import classNames from 'classnames';
import uuid from 'uuid/v4';
import moment from 'moment';
import { browserHistory } from 'react-router';
import { dateTime, dateTypes } from '../../../../lib/dateTime';
import { round, getParticipantName } from '../../../../lib/utils';
import SpinBox from '../SpinBox';
import Button from '../Button';
import styles from './style.less';

const getBetLiability = state => {
	const { odds, stake, type } = state;

	if (type === 'back') {
		return stake;
	} else {
		return odds * stake;
	}
};

const getTotalPool = state => {
	const { odds, stake, type } = state;

	if (type === 'back') {
		return (odds - 1) * stake;
	} else {
		return stake;
	}
};

class MarketListItem extends Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			activeOption: '',
			odds: '',
			available: '',
			stake: '',
			type: '',
			isMatchSuspended: this.isMatchSuspended(
				parseFloat(props.item.get('commence'))
			),
		};

		this.handleOddsClick = this.handleOddsClick.bind(this);
		this.handleConfirmClick = this.handleConfirmClick.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.resetState = this.resetState.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.item.get('name') != nextProps.item.get('name')) {
			this.resetState();
		}
	}

	get contentLeft() {
		const date = this.props.item.get('commence');
		return (
			<div className={styles.itemDate}>
				<div>
					<span className={styles.itemDateDay}>
						{dateTime(date, dateTypes.calendarDay)}
					</span>
					<span className={styles.itemDateTime}>
						{dateTime(date, dateTypes.time)}
					</span>
				</div>
			</div>
		);
	}

	get contentRight() {
		return (
			<div className={styles.side}>
				<div>
					<span className={styles.sideMatched}>
						{t('core:markets.item.matched')}
					</span>
					<span className={styles.sidePool}>
						{this.printNumber(this.props.item.get('matched'))}
					</span>
					<span className={styles.sideCurrency}>
						{t(`core:currency.${this.props.currency}`)}
					</span>
					{/*<span className={styles.sideRules}>{t('core:markets.item.rules')}></span>*/}
				</div>
			</div>
		);
	}

	get contentMiddle() {
		const outcomes = this.props.item.get('outcomes');
		const rows = Array.apply(null, { length: outcomes }).map((_, idx) => {
			return this.renderMarketRow(idx);
		});
		return <div className={styles.main}>{rows}</div>;
	}

	get exchangeRate() {
		return this.props.currency === 'GAS' ? 1 : this.props.exchangeRate;
	}

	get showDraw() {
		return false;
	}

	printNumber(number) {
		number = number * this.exchangeRate;

		if (this.props.currency == 'GAS') {
			number = round(number, 1);
		} else {
			number = round(number, 0);
		}

		return number.toLocaleString();
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
			if (available > temp) {
				temp = available;
				tempIndex = index;
			}

			if (
				available < this.props.minimumBet / this.exchangeRate ||
				oddsArray.length >= limit
			)
				return;
			oddsArray.push(odd);
		});

		if (oddsArray.length < 1) oddsArray.push(bets.get(tempIndex));

		return oddsArray;
	}

	getProfit(odds, stake) {
		return Math.round((odds * stake + 0.00001 - stake) * 1000) / 1000 || 0;
	}

	getBetID(outcome, type) {
		return `${type}-${outcome}-${this.props.item.get('name')}-`;
	}

	handleOddsClick(outcome, bet, type) {
		return event => {
			if (this.props.onOddsClick) {
				return this.props.onOddsClick({
					id: this.getBetID(outcome, type),
					bet: bet,
					outcome: outcome,
					match: this.props.item,
					type: type,
				});
			}

			this.setState({
				activeOption: outcome,
				odds: bet.get('odds'),
				available: bet.get('available'),
				stake: '',
				type: type,
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
				date_created: moment().unix(),
				profit: this.getProfit(this.state.odds, this.state.stake),
			});
			this.resetState();
		};
	}

	handleInputChange(type) {
		return value => {
			this.setState({
				[type]: value,
			});
		};
	}

	isMatchSuspended(commence) {
		return moment().unix() > commence;
	}

	renderMarketRow(outcome, isDraw) {
		const { item } = this.props;
		const name = getParticipantName(item, outcome);
		return (
			<div className={styles.runnerRow} key={outcome}>
				<div className={styles.marketRow}>
					<span className={styles.marketRowDetail}>{name}</span>
					{!this.state.isMatchSuspended && (
						<div className={styles.marketRowActions}>
							{this.renderBetButtons(outcome, 'back')}
							{this.renderBetButtons(outcome, 'lay')}
						</div>
					)}
				</div>
			</div>
		);
	}

	renderBetRow(runner) {
		if (this.state.activeOption !== runner.get('runner_id')) return null;
		return (
			<div className={styles.betRow}>
				<span className={styles.betRowDetail}>
					{t('core:markets.item.bet-for')}
				</span>
				<div className={styles.betRowActions}>
					<div className={styles.betRowActionsOdds}>
						<span>{t('core:markets.item.odds')}:</span>
						<SpinBox
							value={this.state.odds}
							onChange={this.handleInputChange('odds')}
						/>
					</div>
					<div className={styles.betRowActionsBet}>
						<span>{t('core:markets.item.bet')}:</span>
						<SpinBox
							value={this.state.stake}
							onChange={this.handleInputChange('stake')}
						/>
					</div>
					<div className={styles.betRowActionsProfit}>
						<span>{t('core:markets.item.profit')}:</span>
						<span className={styles.betRowActionsProfitAmount}>
							{this.getProfit(this.state.odds, this.state.stake)}
						</span>
					</div>
					<div className={styles.betRowActionsConfirm}>
						<Button
							color="white"
							size="small"
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

	renderBetButtons(outcome, type) {
		let bets =
			this.getFilteredBets(
				type,
				this.props.item.getIn(['match_odds', type, outcome])
			) || Immutable.List();

		let betArray = [];

		bets.forEach((bet, idx) => {
			betArray.push(this.renderBetButton(outcome, bet, type, idx));
		});

		if (betArray.length < 1) {
			return this.renderBlankButton(outcome, type);
		}

		if (type === 'back') betArray.reverse();

		return betArray;
	}

	renderBetButton(outcome, bet, type, idx) {
		return (
			<Button
				extras={['bet', type]}
				className={styles.oddsButton}
				onClick={this.handleOddsClick(outcome, bet, type)}
				key={idx}
			>
				<div>
					<span className="odds">{bet.get('odds')}</span>
					<span className="matched">
						{this.printNumber(bet.get('available'))}&nbsp;
						{t(`core:currency.${this.props.currency}`)}
					</span>
				</div>
			</Button>
		);
	}

	renderBlankButton(outcome, type) {
		const emptyBet = Immutable.fromJS({ odds: 0, available: 0 });
		return (
			<Button
				extras={['bet', type]}
				className={styles.oddsButton}
				onClick={this.handleOddsClick(outcome, emptyBet, type)}
				key={`blank-${type}`}
			/>
		);
	}

	resetState() {
		this.setState({
			activeOption: '',
			odds: '',
			limit: '',
			stake: '',
			type: '',
		});
	}

	get contentSuspended() {
		return (
			<div className={styles.suspended}>
				<span>
					In-play<br />
					Betting Disabled
				</span>
			</div>
		);
	}

	render() {
		if (this.props.item.isEmpty()) return null;
		return (
			<div className={styles.itemRoot}>
				{this.contentLeft}
				{this.contentMiddle}
				{this.state.isMatchSuspended && this.contentSuspended}
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
	onOddsClick: PropTypes.func,
};

MarketListItem.defaultProps = {
	showDetail: false,
	exchangeRate: 1,
	currency: 'GAS',
};

export default MarketListItem;

import React, { Component } from 'react';
import Transition from 'react-transition-group/Transition';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { t } from 'i18next';
import { getMarketOrder } from '../../../../lib/utils';
import { dateTime, dateTypes } from '../../../../lib/dateTime';
import moment from 'moment';
import MarketListItem from './item';
import {
	fadeDefaultStyle,
	fadeTransitionStyles,
} from '../../../../lib/animation';
import styles from './style.less';

class MarketList extends Component {
	get renderItemsByDate() {
		let arr = [];
		let prevDate;
		this.props.items.forEach(item => {
			const date = moment.unix(item.get('commence')).format('YYYYMMDD');
			if (date !== prevDate) {
				arr.push([]);
			}
			arr[arr.length - 1].push(item);
			prevDate = date;
		});
		return arr.map((item, index) => {
			return (
				<div className={styles.group} key={index}>
					<h5 className={styles.groupHeading}>
						{dateTime(item[0].get('commence'), dateTypes.dayMonthDate)}
					</h5>
					{item.map((markerListItem, index) => (
						<MarketListItem
							key={index}
							item={markerListItem}
							onConfirmBet={this.props.onConfirmBet}
							currency={this.props.currency}
							exchangeRate={this.props.exchangeRate}
							minimumBet={this.props.minimumBet}
							showDetail={this.props.showDetail}
							onOddsClick={this.props.onOddsClick}
						/>
					))}
				</div>
			);
		});
	}

	get renderItemsBySport() {
		let arr = [];
		let prevSport;
		this.props.items.forEach(item => {
			const sport = item.get('sport');
			if (sport !== prevSport) {
				arr.push([]);
			}
			arr[arr.length - 1].push(item);
			prevSport = sport;
		});
		return arr.map((item, index) => {
			return (
				<div className={styles.group} key={index}>
					<h5 className={styles.groupHeading}>
						{t(`core:sport.${item[0].get('sport')}`)}
					</h5>
					{item.map((markerListItem, index) => (
						<MarketListItem
							key={index}
							item={markerListItem}
							onConfirmBet={this.props.onConfirmBet}
							currency={this.props.currency}
							exchangeRate={this.props.exchangeRate}
							minimumBet={this.props.minimumBet}
							showDetail={this.props.showDetail}
							onOddsClick={this.props.onOddsClick}
						/>
					))}
				</div>
			);
		});
	}

	render() {
		if (this.props.items.isEmpty()) return null;
		return (
			<div className={styles.root}>
				<Transition appear={true} in={true} timeout={0}>
					{state => (
						<div
							style={{
								...fadeDefaultStyle,
								...fadeTransitionStyles[state],
							}}>
							{this.props.isFrontPage
								? this.renderItemsBySport
								: this.renderItemsByDate}
						</div>
					)}
				</Transition>
			</div>
		);
	}
}

MarketList.propTypes = {
	onConfirmBet: PropTypes.func,
	exchangeRate: PropTypes.number.isRequired,
	currency: PropTypes.string.isRequired,
	minimumBet: PropTypes.number.isRequired,
	items: PropTypes.instanceOf(Immutable.List),
	showDetail: PropTypes.bool,
	isFrontPage: PropTypes.bool,
	onOddsClick: PropTypes.func,
};

MarketList.defaultProps = {
	showDetail: false,
};

export default MarketList;

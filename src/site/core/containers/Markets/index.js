import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { t } from 'i18next';
import { selectExchangeRate } from '../../selectors/currency';
import { addBet } from '../../reducers/bet';
import MarketList from '../../components/MarketList';
import MarketListSkeleton from '../../components/MarketList/MarketListSkeleton';
import Glyph from '../../components/Glyph';
import { Tabs, Tab } from '../../components/Tabs';
import { addQuery } from '../../../../lib/router';
import styles from './style.less';
import isEqual from 'lodash/isEqual';

export class Markets extends Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			activeOrder: 'date',
		};

		this.handleTabClick = this.handleTabClick.bind(this);
	}

	componentWillMount() {}

	componentWillReceiveProps(nextProps) {
		if (!isEqual(this.props.params, nextProps.params)) {
			this.setState({ activeOrder: 'date' });
		}
	}

	get isFrontPage() {
		return !this.props.params.sport && !this.props.params.competition;
	}

	tabClass(tab) {
		return classNames([tab == this.state.activeOrder ? 'active' : null]);
	}

	handleTabClick(tab) {
		return () => {
			addQuery({ order: tab });
			this.setState({
				activeOrder: tab,
			});
		};
	}

	render() {
		const {
			isLoading,
			items,
			activeCurrency,
			exchangeRate,
			addBet,
			minimumBet,
		} = this.props;
		return (
			<div>
				<Tabs className={styles.tabs}>
					<Tab
						className={this.tabClass('date')}
						onClick={this.handleTabClick('date')}>
						<Glyph size="16" icon="clock" />
						<span>{t('core:markets.header-time')}</span>
					</Tab>
					<Tab
						className={this.tabClass('popular')}
						onClick={this.handleTabClick('popular')}>
						<Glyph size="16" icon="star" />
						<span>{t('core:markets.header-popular')}</span>
					</Tab>
				</Tabs>
				<div className={styles.body}>
					{isLoading && <MarketListSkeleton />}
					{!isLoading && (
						<MarketList
							items={items}
							currency={activeCurrency}
							exchangeRate={exchangeRate}
							onOddsClick={addBet}
							minimumBet={minimumBet}
							isFrontPage={this.isFrontPage}
						/>
					)}
				</div>
			</div>
		);
	}
}

Markets.propTypes = {};

const mapStateToProps = state => {
	return {
		activeCurrency: state.getIn(['core', 'currency', 'activeCurrency']),
		exchangeRate: selectExchangeRate(state),
		isLoading: state.getIn(['core', 'exchange', 'isLoading']),
		minimumBet: state.getIn(['core', 'exchange', 'minimumBet']),
	};
};

const mapDispatchToProps = dispatch => {
	return {
		addBet: (...args) => {
			return dispatch(addBet(...args));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Markets);

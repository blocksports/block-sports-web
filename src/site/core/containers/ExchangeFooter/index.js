import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { t } from 'i18next';
import Currencies from '../../components/Currencies';
import ViewSlider from '../../components/ViewSlider';
import CurrencyToggle from '../../components/CurrencyToggle';
import BlockTimer from '../../components/BlockTimer';
import { selectExchangeRate } from '../../selectors/currency';
import { updateCurrency } from '../../reducers/currency';
import { updateMinimumBet } from '../../reducers/exchange';
import styles from './style.less';

export class ExchangeFooter extends Component {
	constructor(props, context) {
		super(props, context);

		this.handleToggleClick = this.handleToggleClick.bind(this);
	}

	handleToggleClick(currency) {
		this.props.updateCurrency(currency);
	}

	render() {
		return (
			<div className={classNames([styles.root, this.props.className])}>
				<div className={styles.left}>
					<BlockTimer
						lastUpdated={this.props.lastBlockUpdate}
						averageTime={this.props.averageBlockTime}
						isLoading={this.props.isBlockInfoLoading}
					/>
				</div>
				<div className={styles.right}>
					<Currencies
						isLoadingCurrency={this.props.isLoadingCurrency}
						currency={this.props.currency}
						price={this.props.price}
						exchangeCurrency={this.props.exchangeCurrency}
					/>
					<div className={styles.currency}>
						<CurrencyToggle
							currency={this.props.activeCurrency}
							exchangeCurrency={this.props.activeExchangeCurrency}
							onToggle={this.handleToggleClick}
						/>
					</div>
					<div className={styles.betView}>
						<span className={styles.betViewText}>
							{t('core:footer.bet-view')}
						</span>
						<ViewSlider
							currency={this.props.activeCurrency}
							exchangeCurrency={this.props.activeExchangeCurrency}
							exchangeRate={this.props.exchangeRate}
							onChange={this.props.updateMinimumBet}
						/>
					</div>
				</div>
			</div>
		);
	}
}

ExchangeFooter.propTypes = {
	className: PropTypes.string,
};

const mapStateToProps = state => {
	return {
		activeCurrency: state.getIn(['core', 'currency', 'activeCurrency']),
		activeExchangeCurrency: state.getIn([
			'core',
			'currency',
			'activeExchangeCurrency',
		]),
		exchangeRate: selectExchangeRate(state),
		isLoadingCurrency: state.getIn(['core', 'currency', 'isLoading']),
		path: state.getIn([
			'core',
			'router',
			'locationBeforeTransitions',
			'pathname',
		]),
		price: state.getIn(['core', 'currency', 'price']),
		currency: state.getIn(['core', 'currency', 'activeCurrency']),
		exchangeCurrency: state.getIn([
			'core',
			'currency',
			'activeExchangeCurrency',
		]),
		averageBlockTime: state.getIn(['core', 'blockchain', 'averageTime']),
		lastBlockUpdate: state.getIn(['core', 'blockchain', 'lastUpdated']),
		isBlockInfoLoading: state.getIn(['core', 'blockchain', 'isLoading'])
	};
};

const mapDispatchToProps = dispatch => {
	return {
		updateCurrency: (...args) => {
			return dispatch(updateCurrency(...args));
		},
		updateMinimumBet: (...args) => {
			return dispatch(updateMinimumBet(...args));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeFooter);

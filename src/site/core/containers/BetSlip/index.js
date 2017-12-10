import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { t } from 'i18next';
import { placeBet, removeBet, removeAllBets } from '../../reducers/bet';
import { selectExchangeRate } from '../../selectors/currency';
import BetSlipList from '../../components/BetSlipList/index';
import styles from './style.less';

export class BetSlip extends Component {
	componentWillReceiveProps(nextProps) {
		if (!this.props.items.equals(nextProps.items)) {
			this.props.focusTab();
		}
	}

	render() {
		const {
			items,
			activeCurrency,
			exchangeRate,
			placeBet,
			removeBet,
			removeAllBets,
		} = this.props;
		return (
			<div className={classNames([styles.root, this.props.className])}>
				{items.isEmpty() && (
					<div className="empty-text">{t('core:bets.bet-slip.is-empty')}</div>
				)}
				<BetSlipList
					items={items}
					currency={activeCurrency}
					exchangeRate={exchangeRate}
					onBetClick={placeBet}
					onRemoveClick={removeBet}
					onRemoveAllClick={removeAllBets}
				/>
			</div>
		);
	}
}

BetSlip.propTypes = {
	focusTab: PropTypes.func.isRequired,
	isActive: PropTypes.bool.isRequired,
	className: PropTypes.string,
	items: PropTypes.instanceOf(Immutable.Map).isRequired,
	exchangeRate: PropTypes.number.isRequired,
	activeCurrency: PropTypes.string.isRequired,
	placeBet: PropTypes.func.isRequired,
	removeBet: PropTypes.func.isRequired,
	removeAllBets: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
	return {
		items: state.getIn(['core', 'bet', 'betSlip'], Immutable.Map()),
		activeCurrency: state.getIn(['core', 'currency', 'activeCurrency']),
		exchangeRate: selectExchangeRate(state),
	};
};

const mapDispatchToProps = dispatch => {
	return {
		placeBet: (...args) => {
			return dispatch(placeBet(...args));
		},
		removeBet: (...args) => {
			return dispatch(removeBet(...args));
		},
		removeAllBets: (...args) => {
			return dispatch(removeAllBets(...args));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BetSlip);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { t } from 'i18next';
import { selectExchangeRate } from '../../selectors/currency';
import { fetchActiveBets } from '../../reducers/bet';
import ActiveBetList from '../../components/ActiveBetList';
import styles from './style.less';

export class ActiveBets extends Component {
	constructor(props, context) {
		super(props, context);
	}

	componentWillMount() {
		this.props.fetchActiveBets();
	}

	componentWillReceiveProps(nextProps) {
		if (!this.props.items.equals(nextProps.items)) {
			this.props.focusTab();
		}
	}

	get content() {
		if (this.props.items.isEmpty() && !this.props.isLoading) {
			return <div className="empty-text">{t('core:bets.active.is-empty')}</div>;
		}

		return (
			<ActiveBetList
				items={this.props.items}
				currency={this.props.activeCurrency}
				exchangeRate={this.props.exchangeRate}
			/>
		);
	}

	render() {
		return (
			<div className={classNames([styles.root, this.props.className])}>
				{this.content}
			</div>
		);
	}
}

ActiveBets.propTypes = {
	focusTab: PropTypes.func.isRequired,
	isActive: PropTypes.bool.isRequired,
	className: PropTypes.string,
	items: PropTypes.instanceOf(Immutable.List).isRequired,
	exchangeRate: PropTypes.number.isRequired,
	activeCurrency: PropTypes.string.isRequired,
};

const mapStateToProps = state => {
	return {
		items: state.getIn(['core', 'bet', 'activeBets']),
		isLoading: state.getIn(['core', 'bet', 'isLoading']),
		activeCurrency: state.getIn(['core', 'currency', 'activeCurrency']),
		exchangeRate: selectExchangeRate(state),
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchActiveBets: (...args) => {
			return dispatch(fetchActiveBets(...args));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveBets);

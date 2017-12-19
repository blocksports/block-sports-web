import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import { Link, IndexLink } from 'react-router';
import classNames from 'classnames';
import { t } from 'i18next';
import { selectExchangeRate } from '../../selectors/currency';
import { fetchPrice } from '../../reducers/currency';
import { fetchUser } from '../../reducers/user';
import { fetchBlockchainInfo } from '../../reducers/blockchain';
import Button from '../../components/Button';
import Search from '../../components/Search';
// import Account from '../../components/Header/Account';
import Settings from '../../components/Header/Settings';
import NewAccount from '../../components/Header/NewAccount';
import styles from './style.less';
import Logo from '../../../../img/logo-white.svg';

class Header extends Component {
	constructor(props, context) {
		super(props, context);
	}

	componentWillMount() {
		this.props.fetchPrice();
		this.props.fetchUser();
		this.props.fetchBlockchainInfo();
	}

	convert(amount) {
		const rate = this.props.currency === 'GAS' ? 1 : this.props.exchangeRate;
		return (rate * amount).toFixed(2);
	}

	render() {
		const {
			isLoadingCurrency,
			currency,
			price,
			exchangeCurrency,
			balance,
		} = this.props;
		return (
			<header className={styles.root}>
				<IndexLink to="/" className={styles.logo}>
					<img src={Logo} alt="Block Sports logo" />
				</IndexLink>
				<div className={styles.main}>
					<Search />
					<div className={styles.actions}>
						<div className={styles.balance}>
							<h5 className={styles.balanceHeading}>
								{t('core:header.balance')}
							</h5>
							<span className={styles.balanceAmount}>
								{this.convert(balance)}{' '}
								<span className={styles.balanceAmountCurrency}>
									{t(`core:currency.${currency}`)}
								</span>
							</span>
						</div>
						<Settings />
						{/*<Account />*/}
						<NewAccount />
					</div>
				</div>
			</header>
		);
	}
}

Header.propTypes = {
	path: PropTypes.string.isRequired,
	user: PropTypes.instanceOf(Immutable.Map),
};

const mapStateToProps = state => {
	return {
		isLoadingCurrency: state.getIn(['core', 'currency', 'isLoading']),
		isLoggedIn: state.getIn(['core', 'user', 'isLoggedIn']),
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
		exchangeRate: selectExchangeRate(state),
		balance: state.getIn(['core', 'user', 'user', 'balance']),
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchPrice: (...args) => {
			return dispatch(fetchPrice(...args));
		},
		fetchUser: (...args) => {
			return dispatch(fetchUser(...args));
		},
		fetchBlockchainInfo: (...args) => {
			return dispatch(fetchBlockchainInfo(...args));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

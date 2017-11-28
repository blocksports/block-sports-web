import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import { Link, IndexLink } from 'react-router';
import classNames from 'classnames';
import { t } from 'i18next';
import { selectExchangeRate } from '../../selectors/currency';
import { fetchPrice } from '../../reducers/currency';
import { fetchUser } from '../../reducers/user';
import Button from '../../components/Button';
import Search from '../../components/Search';
import styles from './style.less';

import Logo from '../../../../img/header-logo.png';

class Header extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleNewAccountClick = this.handleNewAccountClick.bind(this);
  }

  componentWillMount() {
    this.props.fetchPrice();
    this.props.fetchUser();
  }

  get currencies() {
    return (
      <div className={styles.currencies}>
        {this.renderCurrency('NEO')}
        {this.renderCurrency('GAS')}
      </div>
    );
  }

  get balance() {
    return (
      <div className={styles.balance}>
        <h5 className={styles.balanceHeading}>{t('core:header.balance')}</h5>
        <span className={styles.balanceAmount}>
          {this.convert(this.props.balance)}{' '}
          <span className={styles.balanceAmountCurrency}>{t(`core:currency.${this.props.currency}`)}</span>
        </span>
      </div>
    );
  }

  get settings() {
    return (
      <Button className={classNames([styles.icon, 'button-minimal button-square'])}>
        <i className="fa fa-cog" aria-hidden="true"/>
      </Button>
    );
  }

  get account() {
    return (
      <Button className={classNames([styles.icon, 'button-minimal button-square'])}>
        <i className="fa fa-user" aria-hidden="true"/>
      </Button>
    );
  }

  get newAccount() {
    return (
      <div className={styles.newAccount}>
        <Button className="button-white button-s" onClick={this.handleNewAccountClick}>
          {t('core:header.new-account')}
        </Button>
      </div>
    );
  }

  get content() {
    return (
      <div className={styles.main}>
        <Search />
        <div className={styles.actions}>
          {this.currencies}
          {this.balance}
          {this.settings}
          {this.account}
          {this.newAccount}
        </div>
      </div>
    );
  }

  convert(amount) {
    const rate = this.props.currency === 'GAS' ? 1 : this.props.exchangeRate;
    return (rate * amount).toFixed(2);
  }

  handleNewAccountClick() {
    return;
  }

  renderCurrency(currency) {
    const exchangeCurrency = this.props.exchangeCurrency;
    if (!this.props.price.getIn([currency, exchangeCurrency])) return null;

    return (
      <div className={styles.currency}>
        <span className={styles.currencyName}>{t(`core:currency.${currency}`)}</span>
        <span className={styles.currencyAmount}>
          {this.props.price.getIn([currency, exchangeCurrency]).toFixed(2)}
          {' '}
          <span className={styles.exchangeCurrency}>{t(`core:currency.${exchangeCurrency}`)}</span>
          </span>
      </div>
    )
  }

  render() {
    return (
      <header className={styles.root}>
        <IndexLink to="/" className={styles.logo}>
          <img src={Logo} alt="Block Sports logo" />
        </IndexLink>
        {this.content}
      </header>
    );
  }
}

Header.propTypes = {
  path: PropTypes.string.isRequired,
  user: PropTypes.instanceOf(Immutable.Map)
};

const mapStateToProps = (state) => {
  return {
    'isLoggedIn': state.getIn(['core', 'user', 'isLoggedIn']),
    'path': state.getIn(['core', 'router', 'locationBeforeTransitions', 'pathname']),
    'price': state.getIn(['core', 'currency', 'price']),
    'currency': state.getIn(['core', 'currency', 'activeCurrency']),
    'exchangeCurrency': state.getIn(['core', 'currency', 'activeExchangeCurrency']),
    'exchangeRate': selectExchangeRate(state),
    'balance': state.getIn(['core', 'user', 'user', 'balance'])
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPrice: (...args) => {
      return dispatch(fetchPrice(...args));
    },
    fetchUser: (...args) => {
      return dispatch(fetchUser(...args));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

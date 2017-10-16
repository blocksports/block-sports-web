import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import { Link, IndexLink } from 'react-router';
import classNames from 'classnames';
import { t } from 'i18next';
import { fetchPrice } from '../../reducers/currency';
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
  }

  get logo() {
    return (
        <IndexLink to="/" >
          <img className="header-logo-img panel" src={Logo}/>
        </IndexLink>
    );
  }

  get currencies() {
    return (
      <div className="header-content currencies">
        {this.renderCurrency('NEO')}
        {this.renderCurrency('GAS')}
      </div>
    );
  }

  get balance() {
    return (
      <div className="header-content balance">
        <div className="balance-text">{t('core:header.balance')}</div>
        <div className="balance-amount">
          <span className="price">23.31</span>&nbsp;<span className="currency">GAS</span>
        </div>
      </div>
    );
  }

  get settings() {
    return (
      <div className="header-content settings">
        <i className="fa fa-cog settings-icon" aria-hidden="true"/>
      </div>
    );
  }

  get account() {
    return (
      <div className="header-content account">
        <i className="fa fa-user account-icon" aria-hidden="true"/>
      </div>
    );
  }

  get newAccount() {
    return (
      <div className="header-content new-account">
        <Button
          className={classNames(["btn-main", styles.newAccountButton])}
          onClick={this.handleNewAccountClick}>
          {t('core:header.new-account')}
        </Button>
      </div>
    );
  }

  get content() {
    return (
      <div className="header-content panel">
        <div className="header-left">
          <Search/>
        </div>
        <div className="header-right">
          {this.currencies}
          {this.balance}
          {this.settings}
          {this.account}
          {this.newAccount}
        </div>
      </div>
    );
  }

  handleNewAccountClick() {
    return;
  }

  renderCurrency(currency) {
    const exchangeCurrency = this.props.activeExchangeCurrency;
    if (!this.props.price.getIn([currency, exchangeCurrency])) return null;

    return (
      <div className="price">
        <span className="currency">{t(`core:currency.${currency}`)}</span>
        <div className="price-block">
          <span className="price-block-amount">{this.props.price.getIn([currency, exchangeCurrency]).toFixed(2)}</span>&nbsp;
          <span className="price-block-currency">{t(`core:currency.${exchangeCurrency}`)}</span>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className={styles.root}>
        {this.logo}
        {this.content}
      </div>
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
    'activeExchangeCurrency': state.getIn(['core', 'currency', 'activeExchangeCurrency'])
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPrice: (...args) => {
      return dispatch(fetchPrice(...args));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

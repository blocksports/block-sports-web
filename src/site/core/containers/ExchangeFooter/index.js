import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { t } from 'i18next';
import ViewSlider from '../../components/ViewSlider';
import CurrencyToggle from '../../components/CurrencyToggle';
import { selectExchangeRate } from '../../selectors/currency';
import { updateCurrency } from '../../reducers/currency';
import { updateMinimumBet } from '../../reducers/exchange';
import styles from './style.less';

export class ExchangeFooter extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  handleToggleClick(currency) {
    this.props.updateCurrency(currency);
  }

  render() {
    return (
      <div className={classNames([styles.root, this.props.className])}>
        <CurrencyToggle
          currency={this.props.activeCurrency}
          exchangeCurrency={this.props.activeExchangeCurrency}
          onToggle={this.handleToggleClick}
          />
        <ViewSlider
          currency={this.props.activeCurrency}
          exchangeCurrency={this.props.activeExchangeCurrency}
          exchangeRate={this.props.exchangeRate}
          onChange={this.props.updateMinimumBet}
          />
      </div>
    );
  }
}

ExchangeFooter.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    'activeCurrency': state.getIn(['core', 'currency', 'activeCurrency']),
    'activeExchangeCurrency': state.getIn(['core', 'currency', 'activeExchangeCurrency']),
    'exchangeRate': selectExchangeRate(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCurrency: (...args) => {
      return dispatch(updateCurrency(...args));
    },
    updateMinimumBet: (...args) => {
      return dispatch(updateMinimumBet(...args));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeFooter);

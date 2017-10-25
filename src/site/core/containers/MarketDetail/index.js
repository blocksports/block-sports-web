import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { t } from 'i18next';
import { selectExchangeRate } from '../../selectors/currency';
import { fetchMarket } from '../../reducers/exchange';
import MarketList from '../../components/MarketList';
import styles from './style.less';

export class MarketDetail extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    this.props.fetchMarket(this.props.params);
  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
      <div className={styles.root}>
        <MarketList
          items={Immutable.List([this.props.item])}
          showDetail={true}
          currency={this.props.activeCurrency}
          exchangeRate={this.props.exchangeRate}
          minimumBet={this.props.minimumBet}
          />
      </div>
    );
  }
}

MarketDetail.propTypes = {
  params: PropTypes.object.isRequired,
  item: PropTypes.instanceOf(Immutable.Map).isRequired,
  fetchMarket: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    item: state.getIn(['core', 'exchange', 'activeMarket'], Immutable.Map()),
    'activeCurrency': state.getIn(['core', 'currency', 'activeCurrency']),
    'exchangeRate': selectExchangeRate(state),
    'minimumBet': state.getIn(['core', 'exchange', 'minimumBet'])
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMarket: (...args) => {
      return dispatch(fetchMarket(...args));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketDetail);

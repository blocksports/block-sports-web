import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { t } from 'i18next';

import styles from './style.less';

class MarketListItem extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showBet: undefined
    };
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  get contentLeft() {
    return (
      <div className="market-item-side">
        Left
      </div>
    );
  }

  get contentRight() {
    return (
      <div className="market-item-side">
        Right
      </div>
    );
  }

  get contentMiddle() {
    return (
      <div className="market-item-middle">
        <div className="market-item-middle-row">
          <div className="market-item-runner">
            {this.props.item.getIn(['runner_a', 'name'])}
          </div>
          <div className="market-item-actions">
              <BetBlock
                odds={3.2}
                matched={21.19}
                />
              <BetBlock
                odds={2.2}
                matched={263.19}
                />
          </div>
        </div>
        {this.contentBetRow('a')}
        {this.contentDrawRow}
        {this.contentBetRow('draw')}
        <div className="market-item-middle-row">
          <div className="market-item-runner">
            {this.props.item.getIn(['runner_b', 'name'])}
          </div>
        </div>
        {this.contentBetRow('b')}
      </div>
    );
  }

  get contentRow() {
    return (
      <div></div>
    );
  }

  get contentDrawRow() {
    if (!this.showDraw) return null;

    return (
      <div className="market-item-middle-row">
      </div>
    );
  }

  get showDraw() {
    return false;
  }

  contentBetRow(bet) {
    if (this.state.showBet != bet) return null;

    return (
      <div className="market-item-middle-row">
        Bet Row
      </div>
    );
  }

  render() {
    console.log(this.props.item)
    return (
      <div className={styles.itemRoot}>
        {this.contentLeft}
        {this.contentMiddle}
        {this.contentRight}
      </div>
    );
  }
}

MarketListItem.propTypes = {
  item: PropTypes.instanceOf(Immutable.Map).isRequired
};

class BetBlock extends Component {
  render() {
    return (
      <div className={styles.blockRoot}>
        <div className="odds">
          {this.props.odds}
        </div>
        <div className="matched">
          {this.props.matched} GAS
        </div>
      </div>
    );
  }
}

export default MarketListItem;

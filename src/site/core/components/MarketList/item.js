import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { t } from 'i18next';
import classNames from 'classnames';
import Button from '../Button';
import styles from './style.less';

class MarketListItem extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      activeOption: null,
      activeOdds: null,
      activeLimit: null,
      activeStake: 0
    };
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
        {this.renderRunnerRows(this.props.item.get('runner_a'))}
        {this.renderRunnerRows(this.props.item.get('runner_b'))}
        {this.showDraw ? this.renderRunnerRows(this.props.item.get('draw')) : null}
      </div>
    );
  }

  get showDraw() {
    return false;
  }

  handleOddsClick(option, bet) {
    return () => {
      this.setState({
        activeOption: option,
        activeOdds: bet.get('odds'),
        activeLimit: bet.get('matched'),
        activeStake: 0
      });
    };
  }

  renderRunnerRows(runner) {
    return (
      <div className="runner">
        <div className="market-item-row">
          <div className="market-item-row-detail">
            {runner.get('name')}
          </div>
          <div className="market-item-row-actions">
            {this.renderBetButton(runner.get('option'), runner.getIn(['back', 0]), 'back')}
            {this.renderBetButton(runner.get('option'), runner.getIn(['lay', 0]), 'lay')}
          </div>
        </div>
        {this.renderBetRow(runner)}
      </div>
    );
  }

  renderBetRow(runner) {
    if (this.state.activeOption !== runner.get('option')) return null;

    return (
      <div className="market-item-row bet">
        <div className="market-item-row-detail">
          {t('core:markets.item.bet-for')}
        </div>
        <div className="market-item-row-actions">
        </div>
      </div>
    );
  }

  renderBetButton(option, bet, type) {
    return (
      <Button
        className={classNames([styles.oddsButton, `btn-${type}`])}
        onClick={this.handleOddsClick(option, bet)}
        >
        <div className="odds">
          {bet.get('odds')}
        </div>
        <div className="matched">
          {bet.get('matched')} {t('core:currency.gas')}
        </div>
      </Button>
    );
  }

  render() {
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
  item: PropTypes.instanceOf(Immutable.Map).isRequired,
  isList: PropTypes.bool.isRequired
};

MarketListItem.defaultProps = {
  isList: true
}

class BetBlock extends Component {
  render() {
    return (
      <a className={styles.blockRoot}>

      </a>
    );
  }
}

export default MarketListItem;

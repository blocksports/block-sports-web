import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { t } from 'i18next';

import MarketListItem from './item';

import styles from './style.less';

class MarketList extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  get renderItems() {
    let items = this.props.items;

    return items.map((item, idx) => {
      return (
        <MarketListItem
          key={idx}
          item={item}
          onConfirmBet={this.props.onConfirmBet}
          />
      );
    });
  }

  render() {
    return (
      <div className={styles.root}>
        {this.renderItems}
      </div>
    );
  }
}

MarketList.propTypes = {
  onConfirmBet: PropTypes.func.isRequired
};

export default MarketList;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import classNames from 'classnames';
import { t } from 'i18next';
import { orderByDate } from '../../../../lib/utils';
import styles from './style.less';

class ActiveBetList extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  get header() {
    return (
      <div className="active-bet-header">
        <div className="runner column">{t('core:bets.active.runner')}</div>
        <div className="odds column">{t('core:bets.active.odds')}</div>
        <div className="remaining column">{t('core:bets.active.remaining')}</div>
        <div className="status column">{t('core:bets.active.status')}</div>
      </div>
    );
  }

  get activeBets() {
    let items = this.props.items;

    items = items.sort(orderByDate('date_created', -1));

    return items.map((bet, index) => {
      return (
        <div key={index} className="active-bet-row">
          <div className="runner column"><i className={`fa fa-circle-o type-icon type-icon-${bet.get('type')}`} aria-hidden="true"/>{bet.get('runner_name')}</div>
          <div className="odds column">{bet.get('odds')}</div>
          <div className="remaining column">{bet.get('stake')}</div>
          <div className="status column">{this.renderStatus(bet.get('status'))}</div>
        </div>
        );
    });
  }

  renderStatus(status) {
    return (
      <div className={`status-block status-block-${status}`}>
        {t(`core:bets.active.${status}`)}
      </div>
    );
  }

  render() {
    return (
      <div className={classNames([styles.root, this.props.className])}>
        {this.header}
        <div className="active-bet-items">
          {this.activeBets}
        </div>
      </div>
    );
  }
}

ActiveBetList.propTypes = {
  className: PropTypes.string,
  items: PropTypes.instanceOf(Immutable.List).isRequired
};

export default ActiveBetList;

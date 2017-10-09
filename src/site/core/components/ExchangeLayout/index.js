import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { t } from 'i18next';

import Navigation from '../../containers/Navigation/index.js';
import Markets from '../../containers/Markets/index.js';

import styles from './style.less';

class ExchangeLayout extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  get contentLeft() {
    return (
      <div className="exchange-content-left panel">
        <Navigation
          sport={this.props.params.sport}
          />
      </div>
    );
  }

  get contentRight() {
    return (
      <div className="exchange-content-right panel">
      </div>
    );
  }

  get contentMiddle() {
    return (
      <div className="exchange-content-middle">
        <div className="exchange-content-middle-top panel">
        </div>
        <div className="exchange-content-middle-bottom panel">
          <Markets
            items={this.props.items}
            />
        </div>
      </div>
    );
  }

  get content() {
    return (
      <div className="exchange-content">
        {this.contentLeft}
        {this.contentMiddle}
        {this.contentRight}
      </div>
    );
  }

  get footer() {
    return (
      <div className="exchange-footer panel">
      </div>
    );
  }

  render() {
    return (
      <div className={styles.root}>
        {this.content}
        {this.footer}
      </div>
    );
  }
}

ExchangeLayout.propTypes = {
  params: PropTypes.object,
  query: PropTypes.string
};

export default ExchangeLayout;

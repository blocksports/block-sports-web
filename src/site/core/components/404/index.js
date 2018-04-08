import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { browserHistory } from 'react-router';
import classNames from 'classnames';
import { t } from 'i18next';

import styles from './style.less';

class ErrorPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      countdown: 5,
      blinkActive: true
    }

    this.countdown = this.countdown.bind(this);
    this.blink = this.blink.bind(this);
  }

  componentWillMount() {
    let timerA = setInterval(this.countdown, 1000);
    let timerB = setInterval(this.blink, 650);
  }

  componentWillReceiveProps(nextProps) {

  }

  get activeStyle() {
    return this.state.blinkActive ? 'border-active' : 'border-inactive';
  }

  blink() {
    const isActive = this.state.blinkActive;
    this.setState({
      blinkActive: !isActive
    });
  }

  countdown() {
    const count = this.state.countdown - 1;

    if (count < 0) {
      browserHistory.push('/');
    } else {
      this.setState({
        countdown: count
      });
    }
  }

  render() {
    return (
      <div className={classNames([styles.root, this.props.className])}>
          <div className="header-section">
            <div className="header-container w-container">
              <div className="header-row w-row">
                <div className="logo-column w-col w-col-4"><a href="https://www.blocksports.com" className="w-inline-block"><img src="https://uploads-ssl.webflow.com/5a4bbb35b668780001b01cbf/5a5dff58a0eb5000019e6ef7_Block%20Sports%20Logo.svg" height="31" alt="Block Sports"/></a></div>
                <div className="links-column w-col w-col-8"></div>
              </div>
            </div>
          </div>
          <div className="utility-page-wrap-copy">
            <div className="utility-page-content">
              <div className="div-block-6">
                <div data-w-id="844d1240-eb15-eaa8-d27b-ef553b6d59be" className={classNames(["div-block-5", this.activeStyle])}>
                  <h2 className="heading-2">404</h2>
                </div>
              </div>
              <h2>Page not found</h2>
              <div className="countdown">Taking you home in <span id="counter" className="span-green">{this.state.countdown}</span> seconds...</div>
            </div>
          </div>
        </div>
    );
  }
}

ErrorPage.propTypes = {
  className: PropTypes.string
};

export default ErrorPage;

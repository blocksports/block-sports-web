import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { t } from 'i18next';

import styles from './style.less';

export class BetSlip extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
      <div className={classNames([styles.root, this.props.className])}>
        {t('core:bets.bet-slip.is-empty')}
      </div>
    );
  }
}

BetSlip.propTypes = {
  dispatch: PropTypes.func.isRequired,
  focusTab: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  className: PropTypes.string
};

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BetSlip);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import classNames from 'classnames';
import { t } from 'i18next';

import styles from './style.less';

class BetSlipList extends Component {
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

      </div>
    );
  }
}

BetSlipList.propTypes = {
  className: PropTypes.string
};

export default BetSlipList;

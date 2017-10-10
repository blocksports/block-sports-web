import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { t } from 'i18next';

import styles from './style.less';

class SpinBox extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
      <div className={styles.root}>

      </div>
    );
  }
}

SpinBox.propTypes = {
};

export default SpinBox;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import classNames from 'classnames';
import { t } from 'i18next';

import styles from './style.less';

class SpinBox extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  handleInputChange(e) {
    if (e.target.value > parseFloat(this.props.maximum)) return;

    this.props.onChange(e.target.value);
  }

  render() {
    return (
      <div className={classNames([styles.root, this.props.className])}>
        <input
          value={this.props.value}
          placeholder={this.props.placeholder}
          onChange={this.handleInputChange}
          type="number"
          min={this.props.minimum}
          max={this.props.maximum}
          />

        <div>

        </div>
      </div>
    );
  }
}

SpinBox.propTypes = {
  value: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  minimum: PropTypes.number,
  maximum: PropTypes.number
};

SpinBox.defaultProps = {
  minimum: 0
}

export default SpinBox;

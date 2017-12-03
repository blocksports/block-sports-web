import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { t } from 'i18next';
import classNames from 'classnames';
import styles from './style.less';

class Button extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    if (this.props.isDisabled || !this.props.onClick) return;
    this.props.onClick(event);
  }

  render() {
    return (
      <button className={classNames(['button', this.props.className, {'button-disabled': this.props.isDisabled}])} onClick={this.handleClick}>
        {this.props.children}
      </button>
    );
  }
}

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool,
  classNames: PropTypes.string
};

Button.defaultProps = {
  isDisabled: false
}

export default Button;

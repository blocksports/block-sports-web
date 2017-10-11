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

  handleClick() {
    if (this.props.isDisabled) return;

    this.props.onClick();
  }

  render() {
    return (
      <a
        className={classNames(['btn', this.props.className, {"btn-disabled": this.props.isDisabled}])}
        onClick={this.handleClick}
        type="button"
        >
        {this.props.children}
      </a>
    );
  }
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  classNames: PropTypes.string
};

Button.defaultProps = {
  isDisabled: false
}


export default Button;

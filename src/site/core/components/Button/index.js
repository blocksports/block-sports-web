import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { t } from 'i18next';
import classNames from 'classnames';
import styles from './style.less';

class Button extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
      <a
        className={classNames(['btn', this.props.className])}
        onClick={this.props.onClick}
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
  classNames: PropTypes.string
};

export default Button;

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
		const { isDisabled, onClick } = this.props;
		if (isDisabled || !onClick) return;
		onClick(event);
	}

	render() {
		const { size, color, extras, isDisabled, className, children } = this.props;
		return (
			<button
				className={classNames([
					styles.root,
					size ? styles[`button-${size}`] : null,
					color ? styles[`button-${color}`] : null,
					extras ? [...extras.map(extra => styles[`button-${extra}`])] : null,
					isDisabled ? styles.disabled : null,
					className,
				])}
				onClick={this.handleClick}
			>
				{children}
			</button>
		);
	}
}

Button.propTypes = {
	children: PropTypes.node,
	onClick: PropTypes.func,
	isDisabled: PropTypes.bool,
	size: PropTypes.string,
	color: PropTypes.string,
	extras: PropTypes.array,
	classNames: PropTypes.string,
};

Button.defaultProps = {
	isDisabled: false,
};

export default Button;

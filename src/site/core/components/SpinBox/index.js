import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import classNames from 'classnames';
import { t } from 'i18next';
import styles from './style.less';
import Button from '../Button';

function stripDots( str ) {
    return str.replace( /^([^.]*\.)(.*)$/, function ( a, b, c ) { 
        return b + c.replace( /\./g, '' );
    });
}

class SpinBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputValue: props.value,
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.increment = this.increment.bind(this);
		this.decrement = this.decrement.bind(this);
	}

	componentWillUpdate(nextProps) {
		if (this.state.inputValue !== nextProps.value) {
			this.setState({
				inputValue: nextProps.value,
			});
		}
	}

	handleInputChange(e) {
		let value = e.target.value
		if (/^[0-9.]*$/.test(value)) {
			// Strip extra decimal points and ensure 2 decimal places
			value = stripDots(value)
			const dotIndex = value.indexOf('.')
			const decimalConst = this.props.decimals + 1
			if (dotIndex > 0 && dotIndex < value.length - decimalConst) {
				value = value.substring(0, dotIndex + decimalConst)
			}

			this.props.onChange(value);
		}
	}

	handleOnClick(e) {
		e.target.select();
	}

	increment() {
		const spinAmount = this.props.spinAmount;
		const nextValue = parseFloat(this.state.inputValue) + spinAmount;

		if (nextValue >= 0) {
			this.props.onChange(nextValue);
			this.setState({
				inputValue: nextValue,
			});
		}
	}

	decrement() {
		const spinAmount = this.props.spinAmount;
		const nextValue = parseFloat(this.state.inputValue) - spinAmount;

		if (nextValue >= 0) {
			this.props.onChange(nextValue);
			this.setState({
				inputValue: parseFloat(this.state.inputValue) - spinAmount,
			});
		}
	}

	render() {
		return (
			<div className={classNames([styles.root, this.props.className])}>
				<div>
					<input
						className={styles.input}
						value={this.state.inputValue}
						placeholder={this.props.placeholder}
						onChange={e => this.handleInputChange(e)}
						onClick={e => this.handleOnClick(e)}
					/>
				</div>
				<div className={styles.buttons}>
					<Button className={styles.increment} onClick={this.increment} />
					<Button className={styles.decrement} onClick={this.decrement} />
				</div>
			</div>
		);
	}
}

SpinBox.propTypes = {
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
	onChange: PropTypes.func.isRequired,
	className: PropTypes.string,
	spinAmount: PropTypes.number.isRequired,
	decimals: PropTypes.number.isRequired,
};

export default SpinBox;

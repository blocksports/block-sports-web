import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import classNames from 'classnames';
import { t } from 'i18next';
import styles from './style.less';
import Button from '../Button';

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
		if (/^[0-9.]*$/.test(e.target.value)) {
			this.props.onChange(e.target.value);
		}
	}

	increment() {
		const nextValue = parseFloat(this.state.inputValue) + 2;
		if (nextValue >= 0) {
			this.props.onChange(nextValue);
			this.setState({
				inputValue: nextValue,
			});
		}
	}

	decrement() {
		const nextValue = parseFloat(this.state.inputValue) - 2;
		if (nextValue >= 0) {
			this.props.onChange(nextValue);
			this.setState({
				inputValue: parseFloat(this.state.inputValue) - 2,
			});
		}
	}

	render() {
		return (
			<div className={classNames([styles.root, this.props.className])}>
				<input
					className={styles.input}
					value={this.state.inputValue}
					placeholder={this.props.placeholder}
					onChange={e => this.handleInputChange(e)}
				/>
				<div className={styles.buttons}>
					<Button
						className={styles.increment}
						onClick={() => this.increment()}
					/>
					<Button
						className={styles.decrement}
						onClick={() => this.decrement()}
					/>
				</div>
			</div>
		);
	}
}

SpinBox.propTypes = {
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
	onChange: PropTypes.func.isRequired,
	className: PropTypes.string,
};

export default SpinBox;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import Slider from 'react-toolbox/lib/slider/Slider';
import { t } from 'i18next';
import { roundByMagnitude } from '../../../../lib/utils';

import styles from './style.less';

const sliderArrays = {
	USD: [0, 5, 10, 25, 50, 100, 250, 500, 1000, 2000],
};

class ViewSlider extends Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			slider: props.defaultPosition,
			value: this.getValue(props.defaultPosition, props),
		};

		this.handleChange = this.handleChange.bind(this);
	}

	componentWillMount() {}

	componentWillReceiveProps(nextProps) {
		if (this.props.currency != nextProps.currency) {
			const index = this.state.slider;
			const newValue = this.getValue(index, nextProps);

			this.setState({ value: newValue });
			this.props.onChange(newValue);
		}
	}

	get max() {
		return sliderArrays[this.props.exchangeCurrency].length - 1;
	}

	currencyConversion(value) {
		const newValue = value / this.props.exchangeRate;
		return roundByMagnitude(newValue);
	}

	handleChange(index) {
		const newValue = this.getValue(index, this.props);
		this.setState({
			slider: index,
			value: newValue,
		});

		this.props.onChange(newValue);
	}

	getValue(index, props) {
		const arrayElement = sliderArrays[props.exchangeCurrency][index];

		return props.currency !== props.exchangeCurrency
			? this.currencyConversion(arrayElement)
			: arrayElement;
	}

	render() {
		return (
			<div className={styles.root}>
				<Slider
					className={styles.slider}
					snaps
					min={0}
					max={this.max}
					step={1}
					value={this.state.slider}
					onChange={this.handleChange}
				/>
				<div className={styles.sliderValue}>
					<span className={styles.value}>{this.state.value}</span>&nbsp;
					<span className={styles.currency}>
						{t(`core:currency.${this.props.currency}`)}
					</span>
				</div>
			</div>
		);
	}
}

ViewSlider.propTypes = {
	currency: PropTypes.string.isRequired,
	exchangeCurrency: PropTypes.string.isRequired,
	exchangeRate: PropTypes.number.isRequired,
	defaultPosition: PropTypes.number.isRequired,
};

ViewSlider.defaultProps = {
	defaultPosition: 0,
};

export default ViewSlider;

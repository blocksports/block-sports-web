import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import classNames from 'classnames';
import { t } from 'i18next';
import styles from './style.less';

class CurrencyToggle extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			activeOption: props.currency,
		};
	}

	handleToggleClick(option) {
		return () => {
			if (option == this.state.activeOption) return;
			this.setState({ activeOption: option });
			this.props.onToggle(option);
		};
	}

	getOptionClass(option) {
		return classNames([
			styles.option,
			option == this.state.activeOption ? styles.active : null,
		]);
	}

	render() {
		const exchangeCurrency = this.props.exchangeCurrency;
		return (
			<div className={styles.root}>
				<button
					className={this.getOptionClass('GAS')}
					onClick={this.handleToggleClick('GAS')}>
					{t('core:currency.GAS')}
				</button>
				<button
					className={this.getOptionClass(exchangeCurrency)}
					onClick={this.handleToggleClick(exchangeCurrency)}>
					{t(`core:currency.${exchangeCurrency}`)}
				</button>
			</div>
		);
	}
}

CurrencyToggle.propTypes = {
	currency: PropTypes.string.isRequired,
	exchangeCurrency: PropTypes.string.isRequired,
};

export default CurrencyToggle;

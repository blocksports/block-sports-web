import React from 'react';
import Transition from 'react-transition-group/Transition';
import PropTypes from 'prop-types';
import { t } from 'i18next';
import classNames from 'classnames';
import styles from './styles.less';
import SkeletonBlock from '../SkeletonBlock';
import {
	fadeDefaultStyle,
	fadeTransitionStyles,
} from '../../../../lib/animation';


const Currencies = props => {
	const isLoading =
		props.isLoadingCurrency ||
		!props.price.getIn([props.currency, props.exchangeCurrency]);
	return (
		<div className={styles.currencies}>
			{isLoading && (
				<div>
					<div className={styles.currencyLoading}>
						<SkeletonBlock size="large" />
					</div>
					<div className={styles.currencyLoading}>
						<SkeletonBlock size="large" />
					</div>
				</div>
			)}
			{!isLoading && (
				<Transition appear={true} in={true} timeout={0}>
					{state => (
						<div
							style={{
								...fadeDefaultStyle,
								...fadeTransitionStyles[state],
							}}>
							<Currency {...props} currency="NEO" />
							<Currency {...props} currency="GAS" />
						</div>
					)}
				</Transition>
			)}
		</div>
	);
};

const Currency = ({ currency, price, exchangeCurrency }) => (
	<div className={styles.currency}>
		<span className={styles.currencyName}>
			{t(`core:currency.${currency}`)}
		</span>
		<span className={styles.currencyAmount}>
			{price.getIn([currency, exchangeCurrency]).toFixed(2)}{' '}
			<span className={styles.exchangeCurrency}>
				{t(`core:currency.${exchangeCurrency}`)}
			</span>
		</span>
	</div>
);

export default Currencies;

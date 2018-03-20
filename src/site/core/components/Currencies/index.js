import React from 'react';
import Transition from 'react-transition-group/Transition';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { t } from 'i18next';
import classNames from 'classnames';
import styles from './styles.less';
import SkeletonBlock from '../SkeletonBlock';
import {
	fadeDefaultStyle,
	fadeTransitionStyles,
} from '../../../../lib/animation';

const Currencies = props => {
	return (
		<div>
			{props.isLoadingCurrency && (
				<div className={styles.currencies}>
					<div className={styles.currencyLoading}>
						<SkeletonBlock width="large" height="xsmall" />
					</div>
				</div>
			)}
			{!props.isLoadingCurrency && (
				<Transition appear={true} in={true} timeout={0}>
					{state => (
						<div
							className={styles.currencies}
							style={{
								...fadeDefaultStyle,
								...fadeTransitionStyles[state],
							}}>
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
		<div className={styles.currencyInner} data-tip data-for="gas-currency">
			<span className={styles.currencyAmount}>
				{price.getIn([currency, exchangeCurrency]).toFixed(2)}{' '}
				<span className={styles.exchangeCurrency}>
					{t(`core:currency.${exchangeCurrency}`)}
				</span>
			</span>
		</div>
		<ReactTooltip place="right" type="light" effect="solid" id="gas-currency" delayShow={1000} delayHide={200}><span>{t('core:tooltips.footer.gas-currency')}</span></ReactTooltip>
	</div>
);

export default Currencies;

import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'i18next';
import classNames from 'classnames';
import styles from './styles.less';
import SkeletonBlock from '../SkeletonBlock';

const Currencies = (props) => (
  <div className={styles.currencies}>
    <Currency {...props} currency="NEO" />
    <Currency {...props} currency="GAS" />
  </div>
)

const Currency = ({ isLoadingCurrency, currency, price, exchangeCurrency }) => {
  const isLoading = isLoadingCurrency || !price.getIn([currency, exchangeCurrency])
  return (
    <div>
      {isLoading &&
        <div className={styles.currencyLoading}>
          <SkeletonBlock size="large" />
        </div>
      }
      {!isLoading &&
        <div className={styles.currency}>
          <span className={styles.currencyName}>{t(`core:currency.${currency}`)}</span>
          <span className={styles.currencyAmount}>
            {price.getIn([currency, exchangeCurrency]).toFixed(2)}
            {' '}
            <span className={styles.exchangeCurrency}>{t(`core:currency.${exchangeCurrency}`)}</span>
          </span>
        </div>
      }
    </div>
  )
}

export default Currencies;

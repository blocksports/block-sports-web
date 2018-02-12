import React from 'react';
import PropTypes from 'prop-types';
import Field from './field';
import { confirmBetPaymentFields } from '../../../../../../lib/utils';
import styles from './styles.less';

const ManualPaymentMethod = props => (
	<div className={styles.root}>
		<p className={styles.header}>
			Send <span className={styles.amount}>{props.stake}</span> GAS with the
			parameters below
		</p>
		{confirmBetPaymentFields.map((field, i) => <Field key={i} {...field} />)}
	</div>
);

ManualPaymentMethod.propTypes = {
	stake: PropTypes.number.isRequired,
};

export default ManualPaymentMethod;

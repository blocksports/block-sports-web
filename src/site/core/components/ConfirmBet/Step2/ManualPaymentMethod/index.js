import React from 'react';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import Field from './field';
import { createConfirmBetPaymentFields } from '../../../../../../lib/utils';
import styles from './styles.less';

const ManualPaymentMethod = props => (
	<div className={styles.root}>
		<p className={styles.header}>
			Send <span className={styles.amount}>{props.stake}</span> GAS with the
			parameters below
		</p>
		{createConfirmBetPaymentFields(props.bet).map((field, i) => (
			<Field key={i} {...field} />
		))}
	</div>
);

ManualPaymentMethod.propTypes = {
	stake: PropTypes.number.isRequired,
	bet: PropTypes.instanceOf(Immutable.Map),
};

export default ManualPaymentMethod;

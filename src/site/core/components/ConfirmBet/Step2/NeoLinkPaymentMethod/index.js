import React from 'react';
import PropTypes from 'prop-types';
import Glyph from '../../../Glyph';
import styles from './styles.less';

const NeoLinkPaymentMethod = props => (
	<div className={styles.root}>
		<div className={styles.item}>
			<Glyph className={styles.glyph} size="18" icon="check" />
			<p>Wallet Linked</p>
		</div>
		<div className={styles.item}>
			<p>
				Please confirm <span className={styles.amount}>{props.stake}</span> GAS
				transaction
			</p>
		</div>
	</div>
);

NeoLinkPaymentMethod.propTypes = {
	stake: PropTypes.number.isRequired,
};

export default NeoLinkPaymentMethod;

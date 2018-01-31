import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import classNames from 'classnames';
import { getMatchName } from '../../../../lib/utils';
import Status from '../Status';
import styles from './styles.less';

const Item = ({ notification }) => (
	<div className={classNames([styles.item, notification.get('type')])}>
		<div className={styles.itemDetails}>
			<div className={styles.itemHeader}>
				<span>{notification.get('runnerName')}</span>
			</div>
			<div className={styles.itemHeaderSub}>
				<span>{getMatchName(notification)}</span>
			</div>
			<div className={styles.itemDetailsBottom}>
				<span>Bet {notification.get('outcome')}</span>
				{notification.get('status') && (
					<Status
						status={notification.get('status')}
						className={styles.itemStatus}
					/>
				)}
			</div>
		</div>
		<div className={styles.itemDate}>
			<span>{notification.get('date')}</span>
		</div>
	</div>
);

Item.propTypes = {
	notification: PropTypes.instanceOf(Immutable.List).isRequired,
};

export default Item;

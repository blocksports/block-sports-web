import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import classNames from 'classnames';
import { t } from 'i18next';
import { orderByDate } from '../../../../lib/utils';
import styles from './style.less';
import ActiveBetListItem from './item';

const ActiveBetList = props => {
	let items = props.items || [];
	items = items.sort(orderByDate('date_created', -1));
	return (
		<div className={classNames([styles.root, props.className])}>
			{items.map((bet, i) => (
				<ActiveBetListItem
					key={bet.get('id')}
					bet={bet}
					currency={props.currency}
					exchangeRate={props.exchangeRate}
				/>
			))}
		</div>
	);
};

ActiveBetList.propTypes = {
	className: PropTypes.string,
	items: PropTypes.instanceOf(Immutable.List).isRequired,
	exchangeRate: PropTypes.number.isRequired,
	currency: PropTypes.string.isRequired,
};

export default ActiveBetList;

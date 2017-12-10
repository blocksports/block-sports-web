import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import classNames from 'classnames';
import { t } from 'i18next';
import ReactTooltip from 'react-tooltip';
import { orderByDate } from '../../../../lib/utils';
import styles from './style.less';
import ActiveBetListItem from './item';

class ActiveBetList extends Component {
	render() {
		const { currency } = this.props;
		let items = this.props.items || [];
		items = items.sort(orderByDate('date_created', -1));
		return (
			<div className={classNames([styles.root, this.props.className])}>
				{items.map((bet, index) => (
					<ActiveBetListItem key={index} bet={bet} currency={currency} />
				))}
			</div>
		);
	}
}

ActiveBetList.propTypes = {
	className: PropTypes.string,
	items: PropTypes.instanceOf(Immutable.List).isRequired,
	exchangeRate: PropTypes.number.isRequired,
	currency: PropTypes.string.isRequired,
};

export default ActiveBetList;

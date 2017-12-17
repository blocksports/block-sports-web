import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Scrollbars from '../Scrollbars';
import Immutable from 'immutable';
import { t } from 'i18next';
import Bets from '../Bets';
import Chat from '../Chat';
import Navigation from '../../containers/Navigation';
import Markets from '../../containers/Markets';
import MarketDetail from '../../containers/MarketDetail';
import ExchangeFooter from '../../containers/ExchangeFooter';
import styles from './style.less';

const ExchangeLayout = props => (
	<div>
		<div className={styles.root}>
			<div className={styles.left}>
				<Scrollbars>
					<Navigation sport={props.params.sport} />
				</Scrollbars>
			</div>
			<div className={styles.main}>
				<Scrollbars>
					{/*<figure className={styles.mainMedia} />*/}
					<div className={styles.mainMarket}>
						{props.params.entity === 'market' && (
							<MarketDetail params={props.params} />
						)}
						{props.params.entity !== 'market' && (
							<Markets items={props.items} params={props.params} />
						)}
					</div>
				</Scrollbars>
			</div>
			<div className={styles.right}>
				<Bets className={styles.bets} />
				<div className={styles.chat}>
					<Chat params={props.params} />
				</div>
			</div>
		</div>
		<ExchangeFooter className={styles.footer} />
	</div>
);

ExchangeLayout.propTypes = {
	params: PropTypes.object,
	query: PropTypes.object,
	items: PropTypes.instanceOf(Immutable.List).isRequired,
};

export default ExchangeLayout;

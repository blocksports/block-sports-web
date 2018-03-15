import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import Immutable from 'immutable';
import { t } from 'i18next';
import Bets from '../Bets';
import Chat from '../Chat';
import CardBanner from '../../containers/CardBanner';
import Navigation from '../../containers/Navigation';
import Markets from '../../containers/Markets';
import MarketDetail from '../../containers/MarketDetail';
import ExchangeFooter from '../../containers/ExchangeFooter';
import styles from './style.less';

class ExchangeLayout extends Component {
	render() {
		return (
			<div>
				<div className={styles.root}>
					<div className={styles.left}>
						<Scrollbars ref="scrollbarLeft">
							<Navigation sport={this.props.params.sport} />
						</Scrollbars>
					</div>
					<div className={styles.main}>
						<Scrollbars ref="scrollbarMain">
							<CardBanner />
							<div className={styles.mainMarket}>
								{this.props.params.entity === 'market' && (
									<MarketDetail params={this.props.params} />
								)}
								{this.props.params.entity !== 'market' && (
									<Markets
										items={this.props.items}
										params={this.props.params}
									/>
								)}
							</div>
						</Scrollbars>
					</div>
					<div className={styles.right}>
						<Bets className={styles.bets} />
						<div className={styles.chat}>
							<Chat params={this.props.params} />
						</div>
					</div>
				</div>
				<ExchangeFooter className={styles.footer} />
			</div>
		);
	}
}

ExchangeLayout.propTypes = {
	params: PropTypes.object,
	query: PropTypes.object,
	items: PropTypes.instanceOf(Immutable.List).isRequired,
};

export default ExchangeLayout;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { selectExchangeRate } from '../../selectors/currency';
import { fetchCards } from '../../reducers/cards';
import { connect } from 'react-redux';
import Card from '../../components/CardBanner/card';
import EmptyCard from '../../components/CardBanner/cardEmpty';
import CardSkeleton from '../../components/CardBanner/cardSkeleton';
import styles from './style.less';

class CardBanner extends Component {
	componentWillMount() {
		this.props.fetchCards();
	}

	render() {
		const { currency, cards, isLoading } = this.props;
		const exchangeRate = currency === 'GAS' ? 1 : this.props.exchangeRate;

		let emptyID = 0;

		if (isLoading) {
			return (
				<div className={styles.root}>
					{[...Array(3)].map((_, i) => <CardSkeleton key={i} />)}
				</div>
			);
		}

		return (
			<div className={styles.root}>
				{cards.map((card, index) => {
					if (card.get('id') != '') {
						return (
							<Card
								key={index}
								currency={currency}
								exchangeRate={exchangeRate}
								sport={card.get('sport')}
								name={card.get('name')}
								commence={card.get('commence')}
								matched={card.get('total_matched')}
								id={card.get('id')}
							/>
						);
					} else {
						emptyID++;

						return (
							<EmptyCard
								key={index}
								cardID={emptyID}
							/>
						);
					}		
				})}
			</div>
		);
	}
}

CardBanner.propTypes = {

};

const mapStateToProps = state => {
	return {
		cards: state.getIn(['core', 'cards', 'items']),
		currency: state.getIn(['core', 'currency', 'activeCurrency']),
		exchangeRate: selectExchangeRate(state),
		isLoading: state.getIn(['core', 'cards', 'isLoading']),
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchCards: () => {
			return dispatch(fetchCards());
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CardBanner);

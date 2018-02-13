import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import classNames from 'classnames';
import { t } from 'i18next';
import BetSlipItem from './item';
import Glyph from '../Glyph';
import Button from '../Button';
import styles from './style.less';

class BetSlipList extends Component {
	constructor(props, context) {
		super(props, context);
	}

	componentWillMount() {}

	componentWillReceiveProps(nextProps) {}

	get removeAll() {
		if (!this.hasMoreThanOneBet()) return null;
		return (
			<div className={styles.removeAll}>
				<Button
					size="medium"
					color={'black-5'}
					className={styles.removeAllButton}
					onClick={this.props.onRemoveAllClick}
				>
					{t('core:bets.bet-slip.remove-all')} <Glyph size="14" icon="close" />
				</Button>
			</div>
		);
	}

	hasMoreThanOneBet() {
		return (
			this.props.items.get('back', Immutable.Map()).count() +
				this.props.items.get('lay', Immutable.Map()).count() >
			1
		);
	}

	renderBets(type) {
		const {
			items,
			exchangeRate,
			currency,
			onBetClick,
			onRemoveClick,
		} = this.props;
		let betSlipitems = items.get(type) || Immutable.Map();
		betSlipitems = betSlipitems.toList();
		return (
			<TransitionGroup>
				{betSlipitems.map((bet, index) => (
					<Fade key={bet.getIn(['id'])}>
						<BetSlipItem
							item={bet}
							type={type}
							exchangeRate={exchangeRate}
							currency={currency}
							onBetClick={onBetClick}
							onRemoveClick={onRemoveClick}
						/>
					</Fade>
				))}
			</TransitionGroup>
		);
	}

	render() {
		return (
			<div className={classNames([styles.root, this.props.className])}>
				{this.renderBets('back')}
				{this.renderBets('lay')}
				{this.removeAll}
			</div>
		);
	}
}

const Fade = ({ children, ...props }) => (
	<CSSTransition {...props} timeout={300} classNames="fade">
		{children}
	</CSSTransition>
);

BetSlipList.propTypes = {
	className: PropTypes.string,
	items: PropTypes.instanceOf(Immutable.Map).isRequired,
	exchangeRate: PropTypes.number.isRequired,
	currency: PropTypes.string.isRequired,
	onBetClick: PropTypes.func.isRequired,
	onRemoveClick: PropTypes.func.isRequired,
	onRemoveAllClick: PropTypes.func.isRequired,
};

export default BetSlipList;

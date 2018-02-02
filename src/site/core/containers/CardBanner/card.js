import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import moment from 'moment';
import { Link } from 'react-router';
import { t } from 'i18next';
import Glyph from '../../components/Glyph';
import Button from '../../components/Button';
import { round, getGlyphPath } from '../../../../lib/utils';
import {
	fadeDefaultStyle,
	fadeTransitionStyles,
} from '../../../../lib/animation';
import styles from './style.less';

const printNumber = (number, currency, exchangeRate) => {
	number = number * exchangeRate;
	if (currency == 'GAS') {
		number = round(number, 1);
	} else {
		number = round(number, 0);
	}
	return number.toLocaleString();
};

const Card = ({ sport, name, commence, matched, currency, exchangeRate }) => {
	return (
		<div className={styles.item}>
			<Transition appear={true} in={true} timeout={0}>
				{state => (
					<div
						className={styles.itemInner}
						style={{
							...fadeDefaultStyle,
							...fadeTransitionStyles[state],
						}}
					>
						<div className={styles.itemSport}>
							<span>{t(`core:sport.${sport}`)}</span>
						</div>
						<h3 className={styles.itemHeading}>{name}</h3>
						<div className={styles.itemInfo}>
							<h5 className={styles.itemInfoHeading}>Starts</h5>
							<p className={styles.itemInfoDetail}>
								{moment.unix(commence).format('dddd, MMMM Do')}
							</p>
						</div>
						<div className={styles.itemInfo}>
							<h5
								className={styles.itemInfoHeading}
							>{`${currency} matched`}</h5>
							<p className={styles.itemInfoDetail}>
								{printNumber(matched, currency, exchangeRate)}
							</p>
						</div>
						<Button className={styles.itemCta} size="small" color="primary">
							Bet now
						</Button>
					</div>
				)}
			</Transition>
		</div>
	);
};

Card.propTypes = {
	exchangeRate: PropTypes.number.isRequired,
	currency: PropTypes.string.isRequired,
	sport: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	commence: PropTypes.number.isRequired,
	matched: PropTypes.number.isRequired,
};

export default Card;

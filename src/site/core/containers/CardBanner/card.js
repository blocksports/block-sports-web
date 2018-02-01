import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router';
import styles from './style.less';
import Glyph from '../../components/Glyph';
import { t } from 'i18next';
import { round, getGlyphPath } from '../../../../lib/utils';

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
		<Link to={`#`} className={styles.item}>
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
				<h5 className={styles.itemInfoHeading}>{`${currency} matched`}</h5>
				<p className={styles.itemInfoDetail}>
					{printNumber(matched, currency, exchangeRate)}
				</p>
			</div>
			<Glyph
				size={120}
				className={styles.itemGlyph}
				icon={getGlyphPath(sport)}
			/>
		</Link>
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

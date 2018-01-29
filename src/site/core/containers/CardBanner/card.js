import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { Link } from 'react-router';
import styles from './style.less';

const BannerCard = ({ sport, competition, date, matched }) => {
       
	return (
		<div className={styles.root}>

		</div>
	);
};

BannerCard.propTypes = {
    sport: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    commence: PropTypes.number.isRequired,
    matched: PropTypes.number.isRequired
};

export default BannerCard;

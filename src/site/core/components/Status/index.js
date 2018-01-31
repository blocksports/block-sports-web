import React, { Component } from 'react';
import { t } from 'i18next';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.less';

const Status = ({ status, className }) => (
	<div className={classNames([styles.root, className])}>
		<span className={classNames([styles.text, styles[status.toLowerCase()]])}>
			{t(`core:bets.active.${status.toLowerCase()}`)}
		</span>
	</div>
);

Status.propTypes = {
	status: PropTypes.string.isRequired,
};

export default Status;

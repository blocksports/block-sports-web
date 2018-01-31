import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.less';

const Status = ({ status, className }) => (
	<div className={classNames([styles.root, className])}>
		<span className={classNames([styles.text, styles[status]])}>{status}</span>
	</div>
);

Status.propTypes = {
	status: PropTypes.string.isRequired,
};

export default Status;

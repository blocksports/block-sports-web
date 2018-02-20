import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import classNames from 'classnames';
import Button from '../Button';
import styles from './style.less';

export const Tabs = props => (
	<div className={classNames([props.className, styles.tabs])}>
		{props.children}
	</div>
);

export const Tab = props => (
	<Button
		extras={['tab', 'minimal']}
		className={classNames([props.className, styles.tab])}
		onClick={() => props.onClick()}>
		{props.children}
	</Button>
);

Tabs.propTypes = {
	children: PropTypes.node.isRequired,
};

Tabs.defaultProps = {};

Tab.propTypes = {
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func.isRequired,
};

Tab.defaultProps = {};

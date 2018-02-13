import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.less';

const SkeletonBlock = ({ width, height, className }) => (
	<div
		className={classNames([
			styles.root,
			styles[`width-${width}`],
			// styles[`height-${height}`],
			className,
		])}
	/>
);

SkeletonBlock.propTypes = {
	width: PropTypes.string.isRequired,
	// height: PropTypes.string.isRequired,
	className: PropTypes.string,
};

SkeletonBlock.defaultProps = {
	width: 'medium',
	// height: 'large',
};

export default SkeletonBlock;

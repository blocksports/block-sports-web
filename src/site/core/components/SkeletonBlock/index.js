import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.less';

const SkeletonBlock = ({size, className}) => (
	<div className={classNames([styles.root, styles[size], className])} />
)

SkeletonBlock.propTypes = {
  size: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default SkeletonBlock;
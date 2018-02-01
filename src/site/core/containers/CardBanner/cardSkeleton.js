import React from 'react';
import SkeletonBlock from '../../components/SkeletonBlock';
import styles from './style.less';

const CardSkeleton = props => (
	<div className={styles.item}>
		<SkeletonBlock
			className={styles.itemSkeletonBlockHeading}
			width="xsmall"
			height="xsmall"
		/>
		<SkeletonBlock width="large" height="large" />
		<SkeletonBlock
			className={styles.itemSkeletonBlockHeading}
			width="xsmall"
			height="xsmall"
		/>
		<SkeletonBlock width="medium" height="xsmall" />
		<SkeletonBlock
			className={styles.itemSkeletonBlockHeading}
			width="xsmall"
			height="xsmall"
		/>
		<SkeletonBlock width="medium" height="xsmall" />
	</div>
);

export default CardSkeleton;

import React from 'react';
import SkeletonBlock from '../SkeletonBlock';
import styles from './styles.less';

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
		<SkeletonBlock
			width="small"
			height="xsmall"
			className={styles.itemSkeletonBlockHeading}
		/>
	</div>
);

export default CardSkeleton;

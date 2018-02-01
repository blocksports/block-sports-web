import React, { Component } from 'react';
import SkeletonBlock from '../SkeletonBlock';
import styles from './style.less';

const NavListSkeleton = props => (
	<div className={styles.skeletonItems}>
		{[...Array(5)].map((_, i) => {
			return <Item key={i} />;
		})}
	</div>
);

const Item = props => (
	<div className={styles.itemSkeleton}>
		<SkeletonBlock width="large" height="xsmall" />
	</div>
);

export default NavListSkeleton;

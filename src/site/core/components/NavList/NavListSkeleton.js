import React, { Component } from 'react';
import SkeletonBlock from '../SkeletonBlock';
import styles from './style.less';

const NavListSkeleton = props => (
	<div>
		{[...Array(5)].map((_, i) => {
			return <Item key={i}/>
		})}
	</div>
)

const Item = props => (
	<div className={styles.itemSkeleton}>
		<SkeletonBlock size="large" />
	</div>
)

export default NavListSkeleton;
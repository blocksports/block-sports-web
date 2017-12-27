import React from 'react';
import classNames from 'classnames';
import SkeletonBlock from '../SkeletonBlock';
import styles from './style.less';

const MarketListSkeleton = props => (
	<div>
		{[...Array(2)].map((_, i) => (
			<div className={styles.group} key={i}>
				<SkeletonBlock size="xsmall" className={styles.groupHeading} />
				{[...Array(4)].map((_, i) => <Item key={i} />)}
			</div>
		))}
	</div>
);

const Item = props => (
	<div className={styles.itemRoot}>
		<div className={styles.itemDate}>
			<SkeletonBlock size="medium" />
		</div>
		<div className={styles.main}>
			{[...Array(3)].map((_, i) => {
				return (
					<div className={styles.runnerRow} key={i}>
						<div className={styles.marketRow}>
							<SkeletonBlock
								size="medium"
								className={styles.marketRowSkeleton}
							/>
						</div>
					</div>
				);
			})}
		</div>
		<div className={styles.side}>
			<SkeletonBlock size="medium" />
		</div>
	</div>
);

export default MarketListSkeleton;

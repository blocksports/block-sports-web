import React from 'react';
import classNames from 'classnames';
import SkeletonBlock from '../SkeletonBlock'
import style from './style.less';

const MarketListSkeleton = props => (
	<div>
		{[...Array(3)].map((_, i) => {
			return <Item key={i}/>
		})}
	</div>
)

const Item = props => (
	<div className={style.itemRoot}>
		<div className={style.itemDate}>
			<SkeletonBlock size="medium" />
		</div>
		<div className={style.main}>
		{[...Array(3)].map((_, i) => {
  		return (
  			<div className={style.runnerRow} key={i}>
        	<div className={style.marketRow}>
          	<SkeletonBlock size="medium" className={style.marketRowSkeleton} />
        	</div>
      	</div>
			)
		})}
		</div>
		<div className={style.side}>
			<SkeletonBlock size="medium" />
		</div>
	</div>
)

export default MarketListSkeleton;
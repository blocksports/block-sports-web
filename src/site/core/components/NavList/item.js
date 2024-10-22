import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import Glyph from '../Glyph';
import { Link, IndexLink, browserHistory } from 'react-router';
import { getGlyphPath } from '../../../../lib/utils';
import styles from './style.less';

const NavListItem = ({ filter, category, item, isEmpty }) => {
	const competitions = item.get('competitions');
	let link = '';

	if (competitions && competitions.size == 1) {
		const competition = competitions.get(0);
		link = `/exchange/${item.get('id')}/${competition.get('id')}`
	} else {
		link = category && filter
		? `/exchange/${category.get('id')}/${item.get('id')}`
		: `/exchange/${item.get('id')}`;
	}

	if (isEmpty) {
		return (
			<li className={styles.itemEmpty}>
				<div className={styles.itemInner}>
					<div className={styles.itemLeft}>
						{(!category || !filter) && (
							<Glyph
								size="14"
								icon={getGlyphPath(item.get('name'))}
								className={styles.itemIcon}
							/>
						)}
						<span className={styles.itemName}>{item.get('name')}</span>
					</div>
					<div className={styles.itemRight}>
						{(category && filter) && (
							<div className={styles.itemCount}>{item.get('count')}</div>
						)}
					</div>
				</div>
			</li>
		);
	} else {
		return (
			<li>
				<Link
					to={link}
					className={styles.item}
					activeClassName={styles.itemActive}>
					<div className={styles.itemInner}>
						<div className={styles.itemLeft}>
							{(!category || !filter) && (
								<Glyph
									size="14"
									icon={getGlyphPath(item.get('name'))}
									className={styles.itemIcon}
								/>
							)}
							<span className={styles.itemName}>{item.get('name')}</span>
						</div>
						<div className={styles.itemRight}>
							{(category && filter) && (
								<div className={styles.itemCount}>{item.get('count')}</div>
							)}
							<Glyph size="14" icon="right" />
						</div>
					</div>
				</Link>
			</li>
		);
	}


};

NavListItem.propTypes = {
	item: PropTypes.instanceOf(Immutable.Map).isRequired,
	category: PropTypes.instanceOf(Immutable.Map),
	filter: PropTypes.string,
	isEmpty: PropTypes.bool,
};

export default NavListItem;

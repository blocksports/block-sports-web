import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import Immutable from 'immutable';
import { t } from 'i18next';
import classNames from 'classnames';
import Glyph from '../Glyph';
import { Link, IndexLink } from 'react-router';
import { categoryFilters } from '../../../../lib/constants';
import { getGlyphPath } from '../../../../lib/utils';
import NavListItem from './item';
import {
	fadeDefaultStyle,
	fadeTransitionStyles,
} from '../../../../lib/animation';
import styles from './style.less';

class NavList extends Component {
	get category() {
		return this.props.items.find(item => item.get('id') == this.props.filter);
	}

	get header() {
		if (!this.props.filter) {
			return (
				<div className={styles.headerContainer}>
					<div className={classNames([styles.header, styles.headerActive, styles.headerHome])}>
						<Glyph size="22" icon="home" className={styles.headerIcon}/><span className={styles.headerAll}>{t('core:navigation.header-all')}</span>
					</div>
				</div>
			);
		}
		const category = this.category;
		const name = category ? category.get('name') : '';
		return (
			<div className={styles.headerContainer}>
				<Link to="/exchange">
					<div className={classNames([styles.header, styles.headerHome])}>
						<Glyph size="22" icon="home" className={styles.headerIcon}/>
					</div>
				</Link>
					<div className={classNames([styles.header, styles.headerActive])}>
						<Glyph
								size="14"
								icon={getGlyphPath(name)}
								className={styles.headerSportIcon}
						/>
						<span
							><div>{name}</div>
						</span>
					</div>
			</div>
		);
	}

	get renderItems() {
		const category = this.category;
		const items = category ? category.get('competitions') : this.props.items;
		if (!items) return null;
		return items.map((item, i) => {
			if (item.get('count') < 1) {
				return null;
			} else {
				return (		
					<NavListItem
						key={item.get('name')}
						item={item}
						category={category}
						filter={this.props.filter}
					/>
				);
			}
		});
	}

	render() {
		return (
			<Transition appear={true} in={true} timeout={0}>
				{state => (
					<div
						className={styles.root}
						style={{
							...fadeDefaultStyle,
							...fadeTransitionStyles[state],
						}}>
						{this.header}
						<nav className={styles.nav}>
							<ul>{this.renderItems}</ul>
						</nav>
					</div>
				)}
			</Transition>
		);
	}
}

NavList.propTypes = {
	items: PropTypes.instanceOf(Immutable.List).isRequired,
	filter: PropTypes.string,
};

export default NavList;

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
		const category = this.category;

		const name = category ? category.get('name') : '';
		const id = category ? category.get('id') : '';

		return (
			<div>
				<div className={this.activeHeader(!this.props.filter)}>
					<div className={classNames([styles.header, styles.homeActive, styles.headerHome])}>
						<Glyph size="14" icon="home" className={styles.headerIcon}/><span className={styles.headerAll}>{t('core:navigation.header-all')}</span>
					</div>
				</div>
				<div className={this.activeHeader(this.props.filter)}>
					<Link to="/exchange">
						<div className={classNames([styles.header, styles.headerHome])}>
							<Glyph size="14" icon="home" className={styles.headerIcon}/>
						</div>
					</Link>
					<Link to={`/exchange/${id}`} activeClassName={styles.headerActive}>
						<div className={styles.header}>
							<span>
								<div>{name}</div>
							</span>
						</div>
					</Link>
				</div>
			</div>
		);
	}

	get renderItems() {
		const category = this.category;
		const items = category ? category.get('competitions') : this.props.items;
		if (!items) return null;

		// Place sports/leagues without matches last
		let secondItems = [];
		let firstItems = items.map((item, i) => {
			if (item.get('count') < 1) {
				secondItems.push(					
					<NavListItem
						key={item.get('name')}
						item={item}
						category={category}
						filter={this.props.filter}
						isEmpty={true}
					/>
				);
			} else {
				return (		
					<NavListItem
						key={item.get('name')}
						item={item}
						category={category}
						filter={this.props.filter}
						isEmpty={false}
					/>
				);
			}
		});

		return firstItems.concat(secondItems);
	}

	activeHeader(isActive) {
		return isActive ? styles.headerContainer : styles.isNotActive;
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

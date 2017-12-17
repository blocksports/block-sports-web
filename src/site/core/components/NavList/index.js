import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import Immutable from 'immutable';
import { t } from 'i18next';
import classNames from 'classnames';
import { Link, IndexLink } from 'react-router';
import { categoryFilters } from '../../../../lib/constants';
import {
	fadeDefaultStyle,
	fadeTransitionStyles,
} from '../../../../lib/animation';
import styles from './style.less';

class NavList extends Component {
	constructor(props, context) {
		super(props, context);
	}

	componentWillMount() {}

	componentWillReceiveProps(nextProps) {}

	get category() {
		return this.props.items.find(item => item.get('id') == this.props.filter);
	}

	get header() {
		if (!this.props.filter) {
			return <div className={styles.header}>All Markets</div>;
		}

		const category = this.category;
		const name = category ? category.get('name') : '';

		return (
			<div className={styles.header}>
				<span className={styles.headerLink}>
					<Link to="/exchange">{t('core:navigation.header-all')}</Link>
				</span>
				<span>
					<i
						className={classNames(['fa', 'fa-angle-right', styles.headerIcon])}
						aria-hidden="true"
					/>
				</span>
				<span className={styles.headerCategory}>{name}</span>
			</div>
		);
	}

	get renderItems() {
		const category = this.category;
		const items = category ? category.get('competitions') : this.props.items;
		if (!items) return null;
		return items.map((item, idx) => {
			const link = this.props.filter
				? `/exchange/${category.get('id')}/${item.get('id')}`
				: `/exchange/${item.get('id')}`;

			return (
				<li key={idx}>
					<Link
						to={link}
						className={styles.item}
						activeClassName={styles.itemActive}>
						<div className={styles.itemInner}>
							<span className={styles.itemName}>{item.get('name')}</span>
							<div className={styles.itemRight}>
								{this.props.filter && (
									<span className={styles.itemCount}>{item.get('count')}</span>
								)}
								<span>
									<i className="fa fa-angle-right" aria-hidden="true" />
								</span>
							</div>
						</div>
					</Link>
				</li>
			);
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

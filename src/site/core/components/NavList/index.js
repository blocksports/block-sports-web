import React, { Component } from "react";
import PropTypes from "prop-types";
import Transition from "react-transition-group/Transition";
import Immutable from "immutable";
import { t } from "i18next";
import classNames from "classnames";
import Glyph from "../Glyph";
import { Link, IndexLink } from "react-router";
import { categoryFilters } from "../../../../lib/constants";
import NavListItem from "./item";
import {
	fadeDefaultStyle,
	fadeTransitionStyles
} from "../../../../lib/animation";
import styles from "./style.less";

class NavList extends Component {
	get category() {
		return this.props.items.find(item => item.get("id") == this.props.filter);
	}

	get header() {
		if (!this.props.filter) {
			return <div className={styles.header}>All Markets</div>;
		}
		const category = this.category;
		const name = category ? category.get("name") : "";
		return (
			<div className={styles.header}>
				<span className={styles.headerLink}>
					<Link to="/exchange">{t("core:navigation.header-all")}</Link>
				</span>
				<Glyph size="14" icon="right" className={styles.headerIcon} />
				<span className={styles.headerCategory}>{name}</span>
			</div>
		);
	}

	get renderItems() {
		const category = this.category;
		const items = category ? category.get("competitions") : this.props.items;
		if (!items) return null;
		return items.map((item, i) => (
			<NavListItem
				key={item.get("name")}
				item={item}
				category={category}
				filter={this.props.filter}
			/>
		));
	}

	render() {
		return (
			<Transition appear={true} in={true} timeout={0}>
				{state => (
					<div
						className={styles.root}
						style={{
							...fadeDefaultStyle,
							...fadeTransitionStyles[state]
						}}
					>
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
	filter: PropTypes.string
};

export default NavList;

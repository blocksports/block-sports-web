import React, { Component } from "react";
import PropTypes from "prop-types";
import Immutable from "immutable";
import Glyph from "../Glyph";
import { Link, IndexLink } from "react-router";
import styles from "./style.less";

const NavListItem = ({ filter, category, item }) => {
	const link = filter
		? `/exchange/${category.get("id")}/${item.get("id")}`
		: `/exchange/${item.get("id")}`;
	return (
		<li>
			<Link
				to={link}
				className={styles.item}
				activeClassName={styles.itemActive}
			>
				<div className={styles.itemInner}>
					<div className={styles.itemLeft}>
						<Glyph
							height="14"
							width="14"
							icon={item.get("id")}
							className={styles.itemIcon}
						/>
						<span className={styles.itemName}>{item.get("name")}</span>
					</div>
					<div className={styles.itemRight}>
						{filter && (
							<span className={styles.itemCount}>{item.get("count")}</span>
						)}
						<Glyph height="14" width="14" icon="right" />
					</div>
				</div>
			</Link>
		</li>
	);
};

NavListItem.propTypes = {
	item: PropTypes.instanceOf(Immutable.Map).isRequired,
	category: PropTypes.instanceOf(Immutable.Map).isRequired,
	filter: PropTypes.string.isRequired
};

export default NavListItem;

import React from 'react';
import PropTypes from 'prop-types';
import Glyph from '../Glyph';
import styles from './styles.less';

const onSettingsItemClick = e => {
	e.preventDefault();
};

const Item = ({ item }) => {
	return (
		<li className={styles.item}>
			<a href="#" className={styles.itemInner} onClick={onSettingsItemClick}>
				<Glyph
					icon={item.replace(/ /g, '').toLowerCase()}
					size="16"
					className={styles.itemGlyph}
				/>
				<span className={styles.itemName}>{item}</span>
			</a>
		</li>
	);
};

Item.propTypes = {
	item: PropTypes.string.isRequired,
};

export default Item;

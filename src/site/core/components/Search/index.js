import React from 'react';
import Transition from 'react-transition-group/Transition';
import classNames from 'classnames';
import { t } from 'i18next';
import Glyph from '../Glyph';
import dropdown from '../Dropdown';
import dropdownStyles from '../Dropdown/styles.less';
import {
	fadeDefaultStyle,
	fadeTransitionStyles,
} from '../../../../lib/animation';
import styles from './style.less';

const Search = props => (
	<div className={styles.root}>
		<Glyph height="14" width="14" icon="search" className={styles.icon} />
		<input
			className={styles.input}
			placeholder={t('core:header.search-placeholder')}
			onFocus={() => props.openDropdown()}
		/>
		<Transition in={props.showDropdown} timeout={0}>
			{state => (
				<div
					className={classNames([dropdownStyles.dropdown, styles.dropdown])}
					style={{
						...fadeDefaultStyle,
						...fadeTransitionStyles[state],
					}}>
					<div
						className={classNames([
							dropdownStyles.dropdownInner,
							styles.dropdownInner,
						])}>
						<div className={dropdownStyles.dropdownWarning} />
						<Glyph height="40" width="40" icon="search" className={styles.iconLarge} />
						<span>{t('core:header.search-disabled-message')}</span>
					</div>
				</div>
			)}
		</Transition>
	</div>
);

export default dropdown(Search);

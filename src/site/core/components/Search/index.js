import React from 'react';
import Transition from 'react-transition-group/Transition';
import classNames from 'classnames';
import { t } from 'i18next';
import dropdown from '../Dropdown';
import dropdownStyles from '../Dropdown/styles.less';
import {
	fadeDefaultStyle,
	fadeTransitionStyles,
} from '../../../../lib/animation';
import styles from './style.less';

const Search = props => (
	<div className={styles.root}>
		<i
			className={classNames(['fa', 'fa-search', styles.icon])}
			aria-hidden="true"
		/>
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
						<i
							className={classNames(['fa', 'fa-search', styles.iconLarge])}
							aria-hidden="true"
						/>
						<span>{t('core:header.search-disabled-message')}</span>
					</div>
				</div>
			)}
		</Transition>
	</div>
);

export default dropdown(Search);

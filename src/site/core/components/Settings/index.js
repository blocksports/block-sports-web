import React from 'react';
import Transition from 'react-transition-group/Transition';
import classNames from 'classnames';
import Button from '../../components/Button';
import styles from './styles.less';
import dropdown from '../Dropdown';
import Glyph from '../Glyph';
import Item from './item';
import dropdownStyles from '../Dropdown/styles.less';
import {
	fadeDefaultStyle,
	fadeTransitionStyles,
} from '../../../../lib/animation';

const fauxSettings = [
	['Account', 'Wallets', 'Interface'],
	['Active Bets', 'Bet History', 'Sign Out'],
	['Support', 'Feedback'],
];

const Settings = props => {
	return (
		<div className={styles.root}>
			<Button
				className={classNames([
					styles.icon,
					'button-minimal',
					'button-square',
					props.showDropdown ? styles.iconActive : null,
				])}
				onClick={() =>
					props.showDropdown ? props.closeDropdown() : props.openDropdown()
				}
			>
				<Glyph icon="list" size="24" />
			</Button>
			<Transition in={props.showDropdown} timeout={0}>
				{state => (
					<div
						className={classNames([dropdownStyles.dropdown, styles.dropdown])}
						style={{
							...fadeDefaultStyle,
							...fadeTransitionStyles[state],
						}}
					>
						<div className={dropdownStyles.dropdownInner}>
							{fauxSettings.map((settings, i) => (
								<ul className={styles.list} key={i}>
									{settings.map((item, i) => <Item item={item} key={i} />)}
								</ul>
							))}
						</div>
					</div>
				)}
			</Transition>
		</div>
	);
};

export default dropdown(Settings);

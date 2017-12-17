import React from 'react';
import Transition from 'react-transition-group/Transition';
import classNames from 'classnames';
import Button from '../../components/Button';
import styles from './styles.less';
import dropdown from '../Dropdown';
import dropdownStyles from '../Dropdown/styles.less';
import {
	fadeDefaultStyle,
	fadeTransitionStyles,
} from '../../../../lib/animation';

const fauxSettings = [
	'Setting 1',
	'Long Setting 2',
	'Setting 3',
	'Long Setting 4',
	'Setting 5',
];

const Settings = props => {
	return (
		<div className={styles.settingsRoot}>
			<Button
				className={classNames([
					styles.icon,
					'button-minimal',
					'button-square',
					props.showDropdown ? styles.iconActive : null,
				])}
				onClick={() =>
					props.showDropdown ? props.closeDropdown() : props.openDropdown()
				}>
				<i className="fa fa-cog" aria-hidden="true" />
			</Button>
			<Transition in={props.showDropdown} timeout={0}>
				{state => (
					<div
						className={dropdownStyles.dropdown}
						style={{
							...fadeDefaultStyle,
							...fadeTransitionStyles[state],
						}}>
						<div className={dropdownStyles.dropdownInner}>
							<div className={dropdownStyles.dropdownWarning} />
							<ul className={styles.settings}>
								{fauxSettings.map((setting, i) => (
									<li className={styles.settingsItem} key={i}>
										<i className="fa fa-cog" aria-hidden="true" />
										<span>{setting}</span>
									</li>
								))}
							</ul>
						</div>
					</div>
				)}
			</Transition>
		</div>
	);
};

export default dropdown(Settings);

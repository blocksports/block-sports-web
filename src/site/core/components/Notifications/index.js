import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import Transition from 'react-transition-group/Transition';
import Button from '../Button';
import classNames from 'classnames';
import { t } from 'i18next';
import Glyph from '../Glyph';
import dropdown from '../Dropdown';
import NotificationItem from './item';
import dropdownStyles from '../Dropdown/styles.less';
import {
	fadeDefaultStyle,
	fadeTransitionStyles,
} from '../../../../lib/animation';
import styles from './styles.less';

const Notifications = props => (
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
			<Glyph icon="notifications" size="24" />
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
					<div
						className={classNames([
							dropdownStyles.dropdownInner,
							styles.dropdownInner,
						])}
					>
						{props.notifications.map(notification => (
							<NotificationItem
								key={notification.get('id')}
								notification={notification}
							/>
						))}
					</div>
				</div>
			)}
		</Transition>
	</div>
);

Notifications.propTypes = {
	notifications: PropTypes.instanceOf(Immutable.List).isRequired,
};

export default dropdown(Notifications);

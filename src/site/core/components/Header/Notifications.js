import React from "react";
import Transition from "react-transition-group/Transition";
import Button from "../../components/Button";
import classNames from "classnames";
import { t } from "i18next";
import Glyph from "../Glyph";
import dropdown from "../Dropdown";
import dropdownStyles from "../Dropdown/styles.less";
import {
	fadeDefaultStyle,
	fadeTransitionStyles
} from "../../../../lib/animation";
import styles from "./styles.less";

const Notifications = props => (
	<div className={styles.notificationsRoot}>
		<Button
			className={classNames([
				styles.icon,
				"button-minimal",
				"button-square",
				props.showDropdown ? styles.iconActive : null
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
					className={classNames([
						dropdownStyles.dropdown,
						styles.notificationsDropdown
					])}
					style={{
						...fadeDefaultStyle,
						...fadeTransitionStyles[state]
					}}
				>
					<div
						className={classNames([
							dropdownStyles.dropdownInner,
							styles.notificationsDropdownInner
						])}
					>
						<div className={dropdownStyles.dropdownWarning} />
						<Glyph
							size="40"
							icon="notifications"
							className={styles.iconLarge}
						/>
						<span>{t("core:header.notifications-disabled-message")}</span>
					</div>
				</div>
			)}
		</Transition>
	</div>
);

export default dropdown(Notifications);

import React from "react";
import Transition from "react-transition-group/Transition";
import classNames from "classnames";
import Button from "../../components/Button";
import styles from "./styles.less";
import dropdown from "../Dropdown";
import Glyph from "../Glyph";
import dropdownStyles from "../Dropdown/styles.less";
import {
	fadeDefaultStyle,
	fadeTransitionStyles
} from "../../../../lib/animation";

const fauxSettings = [
	["Account", "Wallets", "Interface"],
	["Active Bets", "Bet History", "Sign Out"],
	["Support", "Feedback"]
];

const onSettingsItemClick = e => {
	e.preventDefault();
};

const Settings = props => {
	return (
		<div className={styles.settingsRoot}>
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
				<Glyph icon="viewlist" size="24" />
			</Button>
			<Transition in={props.showDropdown} timeout={0}>
				{state => (
					<div
						className={dropdownStyles.dropdown}
						style={{
							...fadeDefaultStyle,
							...fadeTransitionStyles[state]
						}}
					>
						<div className={dropdownStyles.dropdownInner}>
							{fauxSettings.map((settings, i) => (
								<ul className={styles.settingsList} key={i}>
									{settings.map((item, i) => (
										<li className={styles.settingsItem} key={i}>
											<a
												href="#"
												className={styles.settingsItemInner}
												onClick={onSettingsItemClick}
											>
												<Glyph
													icon={item.replace(/ /g, "").toLowerCase()}
													size="16"
													className={styles.itemGlyph}
												/>
												<span className={styles.itemName}>{item}</span>
											</a>
										</li>
									))}
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

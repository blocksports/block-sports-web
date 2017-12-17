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

const Account = props => (
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
			}>
			<i className="fa fa-user" aria-hidden="true" />
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
						<span className={dropdownStyles.dropdownHeader}>
							Login to continue
						</span>
						<div className={dropdownStyles.dropdownBody}>
							<form className={styles.form}>
								<input className={styles.formInput} placeholder="Username" />
								<input className={styles.formInput} placeholder="Password" />
								<Button
									className={classNames([
										styles.formSubmit,
										'button-white',
										'button-s',
									])}>
									Login
								</Button>
							</form>
							<div className={dropdownStyles.dropdownFooter}>
								<span>Create new account</span>
							</div>
						</div>
					</div>
				</div>
			)}
		</Transition>
	</div>
);

export default dropdown(Account);

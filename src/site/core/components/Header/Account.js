import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import classNames from 'classnames';
import Button from '../../components/Button';
import HeaderDropDown from './Dropdown';
import styles from './styles.less';

const Account = () => (
	<HeaderDropDown
		showButtonIcon={true}
		buttonIcon="user"
		buttonClassName={classNames([styles.icon, 'button-minimal button-square'])}
		buttonActiveClassName={styles.iconActive}
		showWarning={true}>
		<span className={styles.dropdownHeader}>Login to continue</span>
		<div className={styles.dropdownBody}>
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
			<div className={styles.dropdownFooter}>
				<span>Create new account</span>
			</div>
		</div>
	</HeaderDropDown>
);

export default Account;

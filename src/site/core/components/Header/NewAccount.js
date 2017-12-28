import React from 'react';
import Transition from 'react-transition-group/Transition';
import classNames from 'classnames';
import { t } from 'i18next';
import Button from '../../components/Button';
import styles from './styles.less';
import Glyph from '../Glyph';
import dropdown from '../Dropdown';
import dropdownStyles from '../Dropdown/styles.less';
import {
	fadeDefaultStyle,
	fadeTransitionStyles,
} from '../../../../lib/animation';

const NewAccount = props => (
	<div className={styles.naRoot}>
		<Button
			className={classNames([
				styles.naHeaderButton,
				'button-s',
				'button-primary',
				props.showDropdown ? 'button-active' : null,
			])}
			onClick={() =>
				props.showDropdown ? props.closeDropdown() : props.openDropdown()
			}>
			{t('core:header.new-account')}
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
							Create new account
						</span>
						<div
							className={classNames([
								dropdownStyles.dropdownBody,
								styles.naBody,
							])}>
							<Glyph className={styles.naDisabledIcon} icon="ban" width="40" height="40" />
							<span className={styles.naHeading}>
								Sorry! You can't create an account yet.
							</span>
							<p className={styles.naCopy}>
								The Block Sports Exchange is not currently available, this is
								just a proof of concept demo. If you would like us to let you
								know when you can create an account, enter your email below.
							</p>
							<form
								className={styles.form}
								onSubmit={e => this.handleFormSubmit(e)}>
								<input
									className={styles.formInput}
									placeholder="Your email..."
								/>
								<Button
									className={classNames([
										styles.formSubmit,
										'button-white',
										'button-s',
									])}>
									Submit
								</Button>
							</form>
						</div>
					</div>
				</div>
			)}
		</Transition>
	</div>
);

export default dropdown(NewAccount);

import React, { Component } from 'react';
import classNames from 'classnames';
import { t } from 'i18next';
import HeaderDropDown from './Dropdown';
import Button from '../../components/Button';
import styles from './styles.less';

const NewAccount = () => (
	<HeaderDropDown
		showButtonIcon={false}
		buttonText={t('core:header.new-account')}
		buttonClassName={classNames(['button-s', 'button-white'])}
		buttonActiveClassName="button-active"
		showWarning={true}>
		<span className={styles.dropdownHeader}>Create new account</span>
		<div
			className={classNames([
				styles.dropdownBody,
				styles.dropdownNewAccountBody,
			])}>
			<i
				className={classNames(['fa', 'fa-ban', styles.accountDisabledIcon])}
				aria-hidden="true"
			/>
			<span className={styles.accountDisabledHeading}>
				Sorry! You can't create an account yet.
			</span>
			<p className={styles.accountDisabledBody}>
				The Block Sports Exchange is not currently available, this is just a
				proof of concept demo. If you would like us to let you know when you can
				create an account, enter your email below.
			</p>
			<form className={styles.form} onSubmit={e => this.handleFormSubmit(e)}>
				<input className={styles.formInput} placeholder="Your email..." />
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
	</HeaderDropDown>
);

export default NewAccount;

// class NewAccount extends Component {

//   constructor() {
//     super();
//     this.state = {
//       showDropdown: false,
//     }
//     this.handleButtonClick = this.handleButtonClick.bind(this)
//   }

//   handleButtonClick() {
//     this.setState({
//       showDropdown: !this.state.showDropdown,
//     })
//   }

//   handleFormSubmit(e) {
//   	e.preventDefault();
//   	// Post...
//   }

// 	render() {
//     const { showDropdown } = this.state
// 		return (
//       <div className={styles.root}>
//         <Button

//         	onClick={this.handleButtonClick}
//         >

//         </Button>
//         {showDropdown &&
//           <div className={styles.dropdown}>
//             <div className={styles.dropdownInner}>

//               <span className={styles.dropdownHeader}>Create new account</span>

//             </div>
//           </div>
//         }
//       </div>
// 		)
// 	}
// }

// export default NewAccount;
//

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import classNames from 'classnames';
import Button from '../../components/Button';
import styles from './styles.less';

class Account extends Component {

  constructor() {
    super();
    this.state = {
      showDropdown: false,
    }
    this.handleButtonClick = this.handleButtonClick.bind(this)
  }

  handleButtonClick() {
    this.setState({
      showDropdown: !this.state.showDropdown,
    })
  }

	render() {
    const { showDropdown } = this.state
		return (
      <div className={styles.root}>
        <Button className={classNames([styles.icon, showDropdown ? styles.iconActive : null, 'button-minimal button-square'])} onClick={this.handleButtonClick}>
          <i className="fa fa-user" aria-hidden="true"/>
        </Button>
        {showDropdown &&
          <div className={styles.dropdown}>
            <div className={styles.dropdownInner}>
              <div className={styles.dropdownWarning} />
              <span className={styles.dropdownHeader}>Login to continue</span>
              <div className={styles.dropdownBody}>
                <form className={styles.form}>
                  <input className={styles.formInput} placeholder="Username" />
                  <input className={styles.formInput} placeholder="Password" />
                  <Button className={classNames([styles.formSubmit, 'button-white', 'button-s'])}>Login</Button>
                </form>
                <div className={styles.dropdownFooter}>
                  <span>Create new account</span>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
		)
	}
}

export default Account;
        
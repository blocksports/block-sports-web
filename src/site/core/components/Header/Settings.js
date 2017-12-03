import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import classNames from 'classnames';
import Button from '../../components/Button';
import styles from './styles.less';

const fauxSettings = [
  'Setting 1',
  'Long Setting 2',
  'Setting 3',
  'Long Setting 4',
  'Setting 5',
]

class Settings extends Component {
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
          <i className="fa fa-cog" aria-hidden="true"/>
        </Button>
        {showDropdown &&
          <div className={styles.dropdown}>
            <div className={styles.dropdownInner}>
              <div className={styles.dropdownWarning} />
              <ul className={styles.dropdownSettings}>
                {fauxSettings.map((setting, i) => 
                  <li className={styles.dropdownSettingsItem} key={i}>
                     <i className="fa fa-cog" aria-hidden="true"/>
                     <span>{setting}</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        }
      </div>
		)
	}
}

export default Settings;
        
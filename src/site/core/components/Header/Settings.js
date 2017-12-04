import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import HeaderDropDown from './Dropdown';
import styles from './styles.less';

const fauxSettings = [
  'Setting 1',
  'Long Setting 2',
  'Setting 3',
  'Long Setting 4',
  'Setting 5',
]

const Settings = () => 
  <HeaderDropDown 
    showButtonIcon={true}
    buttonIcon="cog"
    buttonClassName={classNames([styles.icon, 'button-minimal button-square'])}
    buttonActiveClassName={styles.iconActive}
    showWarning={true}
  >
    <ul className={styles.dropdownSettings}>
      {fauxSettings.map((setting, i) => 
        <li className={styles.dropdownSettingsItem} key={i}>
           <i className="fa fa-cog" aria-hidden="true"/>
           <span>{setting}</span>
        </li>
      )}
    </ul>
  </HeaderDropDown>

export default Settings;
        
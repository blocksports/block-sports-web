import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import enhanceWithClickOutside from 'react-click-outside';
import Button from '../../components/Button';
import styles from './styles.less';

class HeaderDropDown extends Component {

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

  handleClickOutside() {
    console.log('clicked outside...')
    this.setState({
      showDropdown: false,
    })
  }

	render() {
    const { showDropdown } = this.state
    const { showButtonIcon, buttonIcon, buttonClassName, buttonActiveClassName, buttonText, showWarning, children } = this.props
		return (
      <div className={styles.root}>
	    	<Button className={classNames([buttonClassName, showDropdown ? buttonActiveClassName : null])} onClick={this.handleButtonClick}>
        	{showButtonIcon && <i className={`fa fa-${buttonIcon}`} aria-hidden="true"/>}
          {buttonText}
        </Button>
        {showDropdown &&
          <div className={styles.dropdown}>
            <div className={styles.dropdownInner}>
              {showWarning && <div className={styles.dropdownWarning} />}
              {children}
            </div>
          </div>
        }
      </div>
		)
	}
}

HeaderDropDown.propTypes = {
  showButtonIcon: PropTypes.bool,
  buttonIcon: PropTypes.string,
  buttonClassName: PropTypes.string,
  buttonActiveClassName: PropTypes.string,
  buttonText: PropTypes.string,
  showWarning: PropTypes.bool,
  children: PropTypes.node,
};

export default enhanceWithClickOutside(HeaderDropDown);
        
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import classNames from 'classnames';
import { t } from 'i18next';
import styles from './style.less';

class Search extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: ''
    }
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
  }

  handleMouseEnter() {
    this.setState({
      value: 'Search is currently disabled'
    })
  }

  handleMouseLeave() {
    this.setState({
      value: ''
    })
  }

  render() {
    return (
      <div className={styles.root} onMouseEnter={() => this.handleMouseEnter()} onMouseLeave={() => this.handleMouseLeave()}>
        <i className={classNames(['fa', 'fa-search', styles.icon])} aria-hidden="true"/>
        <input 
          className={styles.input}
          placeholder={t('core:header.search-placeholder')} 
          value={this.state.value}
        />
      </div>
    );
  }
}

Search.propTypes = {
};

export default Search;

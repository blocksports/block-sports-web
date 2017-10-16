import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { t } from 'i18next';

import styles from './style.less';

class Search extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
      <span className={styles.root}>
        <i className="fa fa-search search-icon" aria-hidden="true"/>
        <input className="search" placeholder={t('core:header.search-placeholder')}/>
      </span>
    );
  }
}

Search.propTypes = {
};

export default Search;

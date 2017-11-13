import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { t } from 'i18next';
import { Link, IndexLink } from 'react-router';
import { categoryFilters } from '../../../../lib/constants';

import styles from './style.less';

class NavList extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  get category() {
    return this.props.items.find((item) => item.get('id') == this.props.filter);
  }

  get header() {
    if (!this.props.filter) {
      return (
        <div className="navigation-header">
          All Markets
        </div>
      );
    }

    const category = this.category;
    const name = category ? category.get('name') : '';

    return (
      <div className="navigation-header">
        <span className="navigation-market-link"><Link to="/exchange">{t('core:navigation.header-all')}</Link></span>
        <span className="navigation-caret">></span>
        <span className="navigation-category">{name}</span>
      </div>
    );
  }

  get renderItems() {
    const category = this.category;
    const items = category ? category.get('competitions') : this.props.items;

    return items.map((item, idx) => {
      const link = this.props.filter ?
        `/exchange/${category.get('id')}/${item.get('id')}` :
        `/exchange/${item.get('id')}`;

      return (
        <div className="navigation-row" key={idx}>
          <Link to={link} className="navigation-item" activeClassName={styles.active}>
            <span className="navigation-item-name">{item.get('name')}</span>
            <div className="navigation-item-count">
              <span className="block-number">{item.get('count')}</span>
            </div>
            <span className="navigation-item-caret"><i className="fa fa-caret-right caret-icon" aria-hidden="true"/></span>
          </Link>
        </div>
      );
    });
  }

  navItem(item) {

  }

  render() {
    return (
      <div className={styles.root}>
        {this.header}
        {this.renderItems}
      </div>
    );
  }
}

NavList.propTypes = {
  items: PropTypes.instanceOf(Immutable.List).isRequired,
  filter: PropTypes.string
};

export default NavList;

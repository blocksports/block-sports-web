import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { t } from 'i18next';
import classNames from 'classnames';
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

  get filterExists() {
    return categoryFilters.includes(this.props.filter);
  }

  get header() {
    if (!this.filterExists) {
      return (
        <div className={styles.header}>
          All Markets
        </div>
      );
    }

    return (
      <div className={styles.header}>
        <span className={styles.headerLink}><Link to="/exchange">{t('core:navigation.header-all')}</Link></span>
        <span><i className={classNames(['fa', 'fa-angle-right', styles.headerIcon])} aria-hidden="true"/></span>
        <span className={styles.headerCategory}>{t(`core:categories.${this.props.filter}`)}</span>
      </div>
    );
  }

  get renderItems() {
    let items = this.props.items;

    if (this.filterExists) {
      const category = this.props.items.find((item) => item.get('id') == this.props.filter);
      items = category ? category.get('items') : items;
    }

    return items.map((item, idx) => {
      const link = this.filterExists ?
        `/exchange/${item.get('sport')}/${item.get('type')}/${item.get('id')}` :
        `/exchange/${item.get('id')}`;

      return (
        <li>
          <Link to={link} className={styles.item} activeClassName={styles.itemActive}>
            <span className={styles.itemName}>{item.get('name')}</span>
            <div>
              <span className={styles.itemCount}>({item.get('marketCount')})</span>{' '}
              <span><i className="fa fa-angle-right" aria-hidden="true"/></span>
            </div>
          </Link>
        </li>
      );
    });
  }

  navItem(item) {

  }

  render() {
    return (
      <div className={styles.root}>
        {this.header}
        <nav className={styles.nav}>
          <ul>
            {this.renderItems}
          </ul>
        </nav>
      </div>
    );
  }
}

NavList.propTypes = {
  items: PropTypes.instanceOf(Immutable.List).isRequired,
  filter: PropTypes.string
};

export default NavList;

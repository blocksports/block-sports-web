import React from 'react';
import Header from '../../containers/Header';
import styles from './style.less';

const Layout = props => 
  <div className={styles.root}>
    <Header />
    {props.children}
  </div>

export default Layout;

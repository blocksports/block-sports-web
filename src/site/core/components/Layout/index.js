import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import styles from './style.less';

class Layout extends Component {

  get header() {
    return (
      <div className="header panel">
        Header
      </div>
    );
  }

  get contentLeft() {
    return (
      <div className="content-left panel">
        Left
      </div>
    );
  }

  get contentRight() {
    return (
      <div className="content-right panel">
        Right
      </div>
    );
  }

  get contentMiddle() {
    return (
      <div className="content-middle">
        <div className="content-middle-top panel">
          Middle Top
        </div>
        <div className="content-middle-bottom panel">
          Middle Bottom
          {this.props.children}
        </div>
      </div>
    );
  }

  get content() {
    return (
      <div className="content">
        {this.contentLeft}
        {this.contentMiddle}
        {this.contentRight}
      </div>
    );
  }

  get footer() {
    return (
      <div className="footer panel">
        Footer
      </div>
    );
  }

  render() {
    return (
      <div className={styles.root}>
        {this.header}
        {this.content}
        {this.footer}
      </div>
    );
  }
}

export default Layout;

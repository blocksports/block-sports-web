import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import { Link, IndexLink } from 'react-router';
import classNames from 'classnames';
import { t } from 'i18next';

import _ from 'lodash';

import styles from './style.less';

class Exchange extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props.params, nextProps.params)) {
      
    }
  }

  render() {
    return (
      <div className={styles.root}>
      </div>
    );
  }
}

Exchange.propTypes = {
  params: PropTypes.object
};

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Exchange);

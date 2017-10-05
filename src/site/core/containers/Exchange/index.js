import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import { Link, IndexLink } from 'react-router';
import classNames from 'classnames';
import { t } from 'i18next';
import { selectMarketItems } from '../../selectors/exchange';
import _ from 'lodash';

import styles from './style.less';

class Exchange extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.query.order != nextProps.location.query.order || !_.isEqual(this.props.params, nextProps.params)) {
    }
  }

  render() {
    console.log(this.props)
    return (
      <div className={styles.root}>
      </div>
    );
  }
}

Exchange.propTypes = {
  params: PropTypes.object,
  location: PropTypes.object.isRequired,
  items: PropTypes.instanceOf(Immutable.List).isRequired
};

const mapStateToProps = (state, props) => {
  return {
    items: selectMarketItems(state, props)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Exchange);

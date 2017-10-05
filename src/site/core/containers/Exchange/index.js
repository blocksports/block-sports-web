import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import { Link, IndexLink } from 'react-router';
import classNames from 'classnames';
import { t } from 'i18next';
import { fetchMarkets } from '../../reducers/exchange';
import { selectMarketItems } from '../../selectors/exchange';
import _ from 'lodash';

import styles from './style.less';

class Exchange extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    this.props.fetchMarkets(this.props.params);
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props.params, nextProps.params)) {
      this.props.fetchMarkets(nextProps.params);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(this.props.params, nextProps.params) || !_.isEqual(this.props.location.query, nextProps.location.query) || !Immutable.is(this.props.items, nextProps.items)
  }

  render() {
    console.log(this.props.items)
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
    fetchMarkets: (...args) => {
      return dispatch(fetchMarkets(...args));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Exchange);

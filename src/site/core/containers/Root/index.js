import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import Layout from '../../components/Layout';

import { fetchUser } from '../../reducers/user';

import styles from './style.less';

class Root extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className={styles.root}>
          <Layout>
            {this.props.children}
          </Layout>
      </div>
    );
  }
}

Root.propTypes = {
  user: PropTypes.instanceOf(Immutable.Map).isRequired,
  fetchUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    'user': state.getIn(['core', 'user'], Immutable.Map())
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: (...args) => {
          return dispatch(fetchUser(...args));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);

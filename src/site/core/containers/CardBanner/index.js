import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { t } from 'i18next';
import Card from './card';
import moment from 'moment';
import styles from './style.less';

export class CardBanner extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
      <div className={styles.root}>
        <Card
          sport={"Soccer"}
          league={"A-League"} 
          commence={1516267022908}
          matched={100}
          />
      </div>
    );
  }
}

CardBanner.propTypes = {

};

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardBanner);


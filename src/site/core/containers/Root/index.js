import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import ModalConductor from '../ModalConductor';
import Layout from '../../components/Layout';
// import { fetchUser } from '../../reducers/user';
import styles from './style.less';
import overrides from '../../../../less/_overrides.less';

export const Root = ({ hasAcceptedDemoWarning, children }) => (
	<div className={styles.root}>
		{hasAcceptedDemoWarning && <Layout>{children}</Layout>}
		<ModalConductor />
	</div>
);

Root.propTypes = {
	// user: PropTypes.instanceOf(Immutable.Map).isRequired,
	// fetchUser: PropTypes.func.isRequired,
	hasAcceptedDemoWarning: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
	return {
		// user: state.getIn(['core', 'user'], Immutable.Map()),
		hasAcceptedDemoWarning: state.getIn(
			['core', 'user', 'hasAcceptedDemoWarning'],
			Immutable.Map()
		),
	};
};

const mapDispatchToProps = dispatch => {
	return {
		// fetchUser: (...args) => {
		// 	return dispatch(fetchUser(...args));
		// },
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);

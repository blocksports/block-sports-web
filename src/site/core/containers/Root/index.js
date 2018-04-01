import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import ModalConductor from '../ModalConductor';
import Layout from '../../components/Layout';
import styles from './style.less';
import overrides from '../../../../less/_overrides.less';

export const Root = ({ hasAcceptedDemoWarning, children }) => (
	<div className={styles.root}>
		{hasAcceptedDemoWarning && <Layout>{children}</Layout>}
		<ModalConductor />
	</div>
);

Root.propTypes = {
	hasAcceptedDemoWarning: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
	return {
		hasAcceptedDemoWarning: state.getIn(
			['core', 'user', 'hasAcceptedDemoWarning'],
			Immutable.Map()
		),
	};
};

const mapDispatchToProps = dispatch => {
	return {
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);

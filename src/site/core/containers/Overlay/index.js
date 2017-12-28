import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { browserHistory } from 'react-router';
import classNames from 'classnames';
import styles from './style.less';

export class Overlay extends Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		return <div className={styles.overlay} />;
	}
}

Overlay.propTypes = {
	lastPath: PropTypes.string.isRequired,
	children: PropTypes.node,
};

const mapStateToProps = state => {
	return {
		lastPath: state.getIn(['core', 'routing', 'lastPath'], '/'),
	};
};

const mapDispatchToProps = dispatch => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Overlay);

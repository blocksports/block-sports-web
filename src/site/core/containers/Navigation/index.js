import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import { Link, IndexLink } from 'react-router';
import { fetchNavigation } from '../../reducers/navigation';
import classNames from 'classnames';
import { t } from 'i18next';

import NavListSkeleton from '../../components/NavList/NavListSkeleton';
import NavList from '../../components/NavList';
import styles from './style.less';

class Navigation extends Component {
	componentWillMount() {
		this.props.fetchNavigation();
	}

	render() {
		const { isLoading, items, sport } = this.props;
		if (isLoading) {
			return <NavListSkeleton />;
		}
		return (
			<div className={styles.root}>
				<NavList items={items} filter={sport} />
			</div>
		);
	}
}

Navigation.propTypes = {
	items: PropTypes.instanceOf(Immutable.List).isRequired,
	sport: PropTypes.string,
};

const mapStateToProps = state => {
	return {
		isLoading: state.getIn(['core', 'navigation', 'isLoading']),
		items: state.getIn(['core', 'navigation', 'navigation']),
		path: state.getIn([
			'core',
			'router',
			'locationBeforeTransitions',
			'pathname',
		]),
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchNavigation: (...args) => {
			return dispatch(fetchNavigation(...args));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);

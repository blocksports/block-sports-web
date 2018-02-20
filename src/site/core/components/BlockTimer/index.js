import React, { Component } from 'react';
import Transition from 'react-transition-group/Transition';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import classNames from 'classnames';
import moment from 'moment';
import { t } from 'i18next';
import SkeletonBlock from '../SkeletonBlock';
import styles from './style.less';
import {
	fadeDefaultStyle,
	fadeTransitionStyles,
} from '../../../../lib/animation';

class BlockTimer extends Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			secondsSinceUpdate: this.calculateTimeSince(props.lastUpdated),
			normalisedTime: 0,
		};

		this.tick = this.tick.bind(this);
	}

	componentDidMount() {
		let timer = setInterval(this.tick, 1000);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.lastUpdated != nextProps.lastUpdated) {
			const secondsDiff = this.calculateTimeSince(nextProps.lastUpdated);
			const timeNow = moment.now() / 1000;
			const normalisedTime = (timeNow - nextProps.lastUpdated).toFixed(0);

			// Normalise time due to clocks being out of sync. Not super accurate but works better
			this.setState({
				secondsSinceUpdate: (secondsDiff - normalisedTime).toFixed(0),
				normalisedTime: normalisedTime,
			});
		}
	}

	get averageBlock() {
		return (
			<div className={styles.timeBlock}>
				{this.props.averageTime.toFixed(1)}
			</div>
		);
	}

	get lastBlock() {
		return (
			<div className={styles.timeBlock}>{this.state.secondsSinceUpdate}</div>
		);
	}

	tick() {
		const secondsDiff = this.calculateTimeSince(this.props.lastUpdated);
		const normalisedTime = this.state.normalisedTime;

		this.setState({
			secondsSinceUpdate: (secondsDiff - normalisedTime).toFixed(0),
		});
	}

	calculateTimeSince(updatedAt) {
		const timeNow = moment.now() / 1000;
		const diff = timeNow - updatedAt;
		return diff.toFixed(0);
	}

	render() {
		return (
			<div>
				{this.props.isLoading ? (
					<div className={classNames([styles.root, this.props.className])}>
						<div className={styles.infoLoading}>
							<SkeletonBlock width="large" height="xsmall" />
						</div>
						<div className={styles.infoLoading}>
							<SkeletonBlock width="large" height="xsmall" />
						</div>
					</div>
				) : (
					<Transition appear={true} in={true} timeout={0}>
						{state => (
							<div
								className={classNames([styles.root, this.props.className])}
								style={{
									...fadeDefaultStyle,
									...fadeTransitionStyles[state],
								}}>
								<div className={styles.timeInfo}>
									{t('core:footer.last-block')} {this.lastBlock}
								</div>
								<div className={styles.timeInfo}>
									{t('core:footer.average-block')} {this.averageBlock}
								</div>
							</div>
						)}
					</Transition>
				)}
			</div>
		);
	}
}

BlockTimer.propTypes = {
	className: PropTypes.string,
	lastUpdated: PropTypes.number.isRequired,
	averageTime: PropTypes.number.isRequired,
	isLoading: PropTypes.bool.isRequired,
};

export default BlockTimer;

import React, { Component } from 'react';
import Transition from 'react-transition-group/Transition';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import Immutable from 'immutable';
import classNames from 'classnames';
import moment from 'moment';
import AccurateTimer from 'accurate-timer-js';
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
		let timer = new AccurateTimer(this.tick, 1000);
		timer.start();
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
			<div className={styles.timeBlock} style={this.blockStyle}> {this.state.secondsSinceUpdate}</div>
		);
	}

	get blockStyle() {
		let magnitude = Math.log10(this.state.secondsSinceUpdate);
		magnitude = Math.floor(magnitude);

		const width = 20 + 5*magnitude;

		return {
			minWidth: width
		};

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
								<div className={styles.timeInfo} data-tip data-for="timer-last">
									{t('core:footer.last-block')} {this.lastBlock}
								</div>
								<div className={styles.timeInfo} data-tip data-for="timer-average">
									{t('core:footer.average-block')} {this.averageBlock}
								</div>
								<ReactTooltip place="right" effect="solid" id="timer-last" delayShow={1000} delayHide={200}><span>{t('core:tooltips.footer.timer-last')}</span></ReactTooltip>
								<ReactTooltip place="right" effect="solid" id="timer-average" delayShow={1000} delayHide={200}><span>{t('core:tooltips.footer.timer-average')}</span></ReactTooltip>
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

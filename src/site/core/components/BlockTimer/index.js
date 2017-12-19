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
      secondsSinceUpdate: this.calculateTimeSince(props.lastUpdated)
    }

    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    let timer = setInterval(this.tick, 1000);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.lastUpdated != nextProps.lastUpdated) {
      const timeSince = this.calculateTimeSince(nextProps.lastUpdated)
      this.setState({secondsSinceUpdate: timeSince});
    }
  }

  get averageBlock() {
    return (
      <div className={styles.timeBlock}>
        {this.props.averageTime.toFixed(1)}
      </div>
    )
  }

  get lastBlock() {
    return (
      <div className={styles.timeBlock}>
        {this.state.secondsSinceUpdate}
      </div>
    )
  }

  tick() {  
    const secondsDiff = this.calculateTimeSince(this.props.lastUpdated) 
    
    this.setState({
      secondsSinceUpdate: secondsDiff
    })
  }

  calculateTimeSince(updatedAt) {
    const timeNow = moment.now()/1000;
    const diff = ((timeNow - updatedAt)).toFixed(0);
    return diff < 0 ? 0 : diff;
  }

  render() {
  
    return (
      <div>
        {this.props.isLoading ? (
          <div className={classNames([styles.root, this.props.className])}>
            <div className={styles.infoLoading}>
              <SkeletonBlock size="large" />
            </div>
            <div className={styles.infoLoading}>
              <SkeletonBlock size="large" />
            </div>
          </div>
         ) :
        (
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
  lastUpdated: PropTypes.string.isRequired,
  averageTime: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default BlockTimer;

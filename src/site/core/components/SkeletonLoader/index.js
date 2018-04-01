import React, { Component } from 'react';
import Transition from 'react-transition-group/Transition';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import classNames from 'classnames';
import { t } from 'i18next';
import SkeletonBlock from '../SkeletonBlock';
import {
	fadeDefaultStyle,
	fadeTransitionStyles,
} from '../../../../lib/animation';
import styles from './style.less';

class SkeletonLoader extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
      <div>
        {this.props.isLoading && (
          <div className={this.props.className}>
            <div className={this.props.loadingClassName}>
              <SkeletonBlock width={this.props.width} height={this.props.height} />
            </div>
          </div>
        )}
        {!this.props.isLoading && (
            <Transition appear={true} in={true} timeout={0}>
              {state => 
                <div
                  className={this.props.className}
                  style={{
                    ...fadeDefaultStyle,
                    ...fadeTransitionStyles[state],
                  }}>
                    {this.props.children}
                  </div>
              }
            </Transition>
        )}
      </div>
    );
  }
}

SkeletonLoader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  loadingClassName: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,

};

export default SkeletonLoader;

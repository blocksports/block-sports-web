import React, { Component } from 'react';
import Transition from 'react-transition-group/Transition';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Glyph from '../Glyph';
import Button from '../Button';
import styles from './style.less';
import {
	fadeDefaultStyle,
	fadeTransitionStyles,
	fadeDuration,
	slideUpDefaultStyle,
	slideUpTransitionStyles,
	slideUpDuration,
} from '../../../../lib/animation';

class ModalWrapper extends Component {
	constructor() {
		super();
		this.state = {
			appear: true,
			appearInner: true,
		};
		this.handleBackgroundClick = this.handleBackgroundClick.bind(this);
	}

	handleBackgroundClick(e) {
		if (this.props.allowClose) {
			if (e.target === e.currentTarget) {
				this.setState(
					{
						appearInner: false,
					},
					() => {
						setTimeout(() => {
							this.setState(
								{
									appear: false,
								},
								() => {
									setTimeout(() => {
										this.props.setCurrentModal(null);
									}, fadeDuration);
								}
							);
						}, fadeDuration / 2);
					}
				);
			}
		}
	}

	render() {
		return (
			<Transition appear={true} in={this.state.appear} timeout={fadeDuration}>
				{state => (
					<div
						className={styles.root}
						onClick={this.handleBackgroundClick}
						style={{
							...fadeDefaultStyle,
							...fadeTransitionStyles[state],
						}}
					>
						<Transition
							appear={true}
							in={this.state.appearInner}
							timeout={{
								enter: fadeDuration * 1.5,
								exit: slideUpDuration,
							}}
						>
							{innerState => (
								<article
									className={styles.content}
									style={{
										...slideUpDefaultStyle,
										...slideUpTransitionStyles[innerState],
									}}
								>
									<header>
										{this.props.title && (
											<h3 className={styles.heading}>{this.props.title}</h3>
										)}
										{this.props.allowClose && (
											<Button
												extras={['square', 'minimal']}
												className={styles.closeButton}
												onClick={() => this.props.setCurrentModal(null)}
											>
												<Glyph size="14" icon="close" />
											</Button>
										)}
									</header>
									<section className={styles.body}>
										{this.props.children}
									</section>
								</article>
							)}
						</Transition>
					</div>
				)}
			</Transition>
		);
	}
}

ModalWrapper.propTypes = {
	title: PropTypes.string,
	children: PropTypes.node,
};

ModalWrapper.defaultProps = {
	title: '',
	allowClose: true,
};

export default ModalWrapper;

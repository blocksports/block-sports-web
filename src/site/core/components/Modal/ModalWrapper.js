import React from 'react';
import Transition from 'react-transition-group/Transition';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Glyph from '../Glyph';
import Button from '../Button';
import styles from './style.less';
import {
	fadeDefaultStyle,
	fadeTransitionStyles,
} from '../../../../lib/animation';

const ModalWrapper = props => {
	const handleBackgroundClick = e => {
		if (props.allowClose) {
			e.target === e.currentTarget ? props.setCurrentModal(null) : null;
		}
	};
	return (
		<Transition appear={true} in={true} timeout={0}>
			{state => (
				<div
					className={styles.root}
					onClick={handleBackgroundClick}
					style={{
						...fadeDefaultStyle,
						...fadeTransitionStyles[state],
					}}
				>
					<article className={styles.content}>
						<header>
							{props.title && <h3 className={styles.heading}>{props.title}</h3>}
							{props.allowClose && (
								<Button
									extras={['square', 'minimal']}
									className={styles.closeButton}
									onClick={() => props.setCurrentModal(null)}
								>
									<Glyph size="14" icon="close" />
								</Button>
							)}
						</header>
						<section className={styles.body}>{props.children}</section>
					</article>
				</div>
			)}
		</Transition>
	);
};

ModalWrapper.propTypes = {
	title: PropTypes.string,
	children: PropTypes.node,
};

ModalWrapper.defaultProps = {
	title: '',
	allowClose: true,
};

export default ModalWrapper;

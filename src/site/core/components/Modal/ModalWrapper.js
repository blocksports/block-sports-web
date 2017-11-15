import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.less';

const ModalWrapper = props => {
	const handleBackgroundClick = e => e.target === e.currentTarget ? props.setCurrentModal(null) : null;
	return (
		<div className={styles.root} onClick={handleBackgroundClick}>
			<article className={styles.content}>
				<header className={styles.header}>
			  	{props.title && <h3>{props.title}</h3>}
			    <button onClick={() => props.setCurrentModal(null)}>Close</button>
			  </header>
			  <section className={styles.body}>
			  	{props.children}
			  </section>
			</article>
		</div>
	)
}

ModalWrapper.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

ModalWrapper.defaultProps = {
  title: '',
};

export default ModalWrapper;
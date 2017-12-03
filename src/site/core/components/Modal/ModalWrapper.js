import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../Button'
import styles from './style.less';

const ModalWrapper = props => {
	const handleBackgroundClick = e => {
		if (props.allowClose) {
			e.target === e.currentTarget ? props.setCurrentModal(null) : null
		}
	}
	return (
		<div className={styles.root} onClick={handleBackgroundClick}>
			<article className={styles.content}>
				<header>
		  		{props.title && <h3 className={styles.heading}>{props.title}</h3>}
		  		{props.allowClose &&
			    	<Button className={classNames([styles.closeButton, 'button-square', 'button-minimal'])} onClick={() => props.setCurrentModal(null)}>
			    		<i class="fa fa-times" aria-hidden="true"></i>
			   	 	</Button>
		   	 	}
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
  allowClose: true,
};

export default ModalWrapper;
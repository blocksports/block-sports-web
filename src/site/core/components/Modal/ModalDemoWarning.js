import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { t } from 'i18next';
import ModalWrapper from './ModalWrapper';
import Glyph from '../Glyph';
import Button from '../Button';
import styles from './demoWarning.less';

const ModalDemoWarning = props => (
	<ModalWrapper {...props} allowClose={false}>
		<div className={styles.root}>
			<span className={styles.head}>{t('core:demo-modal.heading')}</span>
			<div className={styles.body}>
				<div className={styles.content}>
					<Glyph size="33" icon="bsx-nocrypto" className={styles.icon} />
					<div className={styles.message}>{t('core:demo-modal.message_1')}</div>
				</div>
				<div className={styles.content}>
					<Glyph size="33" icon="bsx-indev" className={styles.icon} />
					<div className={styles.message}>{t('core:demo-modal.message_2')}</div>
				</div>
			</div>
			<Button
				size="medium"
				color="white"
				className={styles.button}
				onClick={() => {
					props.acceptDemoWarning();
					props.setCurrentModal(null);
				}}>
				{t('core:demo-modal.button').toUpperCase()}
			</Button>
		</div>
	</ModalWrapper>
);

ModalDemoWarning.propTypes = {
	acceptDemoWarning: PropTypes.func.isRequired,
	setCurrentModal: PropTypes.func.isRequired,
};

export default ModalDemoWarning;

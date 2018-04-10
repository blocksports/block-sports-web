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
			<Glyph size="40" icon="feedback" className={styles.icon} />
			<span className={styles.head}>{t('core:demo-modal.heading')}</span>
			<ul>
			<li className={styles.body}>• {t('core:demo-modal.message_1')}</li>
			<li className={styles.body}>• {t('core:demo-modal.message_2')}</li>
			</ul>

			<Button
				size="medium"
				color="white"
				onClick={() => {
					props.acceptDemoWarning();
					props.setCurrentModal(null);
				}}>
				{t('core:demo-modal.button')}
			</Button>
		</div>
	</ModalWrapper>
);

ModalDemoWarning.propTypes = {
	acceptDemoWarning: PropTypes.func.isRequired,
	setCurrentModal: PropTypes.func.isRequired,
};

export default ModalDemoWarning;

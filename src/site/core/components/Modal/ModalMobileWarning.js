import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import ModalWrapper from './ModalWrapper';
import Glyph from '../Glyph';
import classNames from 'classnames';
import styles from './mobileWarning.less';

const ModalMobileWarning = props => (
	<ModalWrapper {...this.props} allowClose={false}>
		<div className={styles.root}>
			<Glyph width="40" height="40" icon="mobile" className={styles.icon} />
			<span className={styles.head}>Sorry! Your screen is too small.</span>
			<p className={styles.body}>
				The Block Sports Exchange is not currently available for mobile devices.
				Upon full release, the Block Sports Exchange will be available for
				download on iOS and Android.
			</p>
		</div>
	</ModalWrapper>
);

ModalMobileWarning.propTypes = {
	setCurrentModal: PropTypes.func.isRequired,
};

export default ModalMobileWarning;

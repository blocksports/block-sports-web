import React, { Component } from "react";
import PropTypes from "prop-types";
import { t } from "i18next";
import ModalWrapper from "./ModalWrapper";
import Glyph from "../Glyph";
import classNames from "classnames";
import styles from "./mobileWarning.less";

const ModalMobileWarning = props => (
	<ModalWrapper {...this.props} allowClose={false}>
		<div className={styles.root}>
			<Glyph size="40" icon="mobile" className={styles.icon} />
			<span className={styles.head}>{t("core:mobile-modal.heading")}</span>
			<p className={styles.body}>{t("core:mobile-modal.message")}</p>
		</div>
	</ModalWrapper>
);

ModalMobileWarning.propTypes = {
	setCurrentModal: PropTypes.func.isRequired
};

export default ModalMobileWarning;

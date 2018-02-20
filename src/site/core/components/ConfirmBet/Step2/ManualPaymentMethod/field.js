import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import classNames from 'classnames';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Button from '../../../Button';
import Glyph from '../../../Glyph';
import {
	fadeDefaultStyle,
	fadeTransitionStyles,
} from '../../../../../../lib/animation';
import styles from './styles.less';

class Field extends Component {
	constructor() {
		super();
		this.state = {
			copied: false,
		};
	}

	onCopy() {
		this.setState(
			{
				copied: true,
			},
			() => {
				setTimeout(() => {
					this.setState({
						copied: false,
					});
				}, 600);
			}
		);
	}

	render() {
		const { label, type, value, showCopyClipboard } = this.props;
		return (
			<div className={styles.field}>
				<div className={styles.fieldMain}>
					<div className={styles.fieldLabel}>
						<span>{label}</span>
						<span>{type}</span>
					</div>
					<span className={styles.fieldValue}>{value}</span>
				</div>
				<div className={styles.fieldActions}>
					{showCopyClipboard && (
						<CopyToClipboard text={value} onCopy={() => this.onCopy()}>
							<Button extras={['minimal', 'square']}>
								<Glyph
									size="20"
									className={classNames([
										styles.fieldActionsCopy,
										this.state.copied ? styles.fieldActionsCopied : null,
									])}
									icon="copyclipboard"
								/>
							</Button>
						</CopyToClipboard>
					)}
					{showCopyClipboard &&
						this.state.copied && (
							<Transition appear={true} in={true} timeout={0}>
								{state => (
									<div
										style={{
											...fadeDefaultStyle,
											...fadeTransitionStyles[state],
										}}>
										<span className={styles.copied}>Copied</span>
									</div>
								)}
							</Transition>
						)}
				</div>
			</div>
		);
	}
}

Field.propTypes = {
	type: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	showCopyClipboard: PropTypes.bool.isRequired,
};

export default Field;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import ModalWrapper from './ModalWrapper';
import Button from '../Button';
import ConfirmBetStep1 from '../ConfirmBet/Step1';
import ConfirmBetStep2 from '../ConfirmBet/Step2';
import styles from './confirmBet.less';

class ModalConfirmBet extends Component {
	constructor() {
		super();
		this.state = {
			currentStep: 1,
			previousStep: null,
			totalSteps: 2,
		};
		this.updateStep = this.updateStep.bind(this);
	}

	updateStep(nextStep) {
		this.setState({
			previousStep: this.state.currentStep,
			currentStep: nextStep,
		});
	}

	render() {
		const { currentStep, previousStep, totalSteps } = this.state;
		const { confirmingBet } = this.props;
		const betType = confirmingBet.getIn(['type']);

		return (
			<ModalWrapper {...this.props} title="Confirm your bet">
				{currentStep == 1 && (
					<div>
						<ConfirmBetStep1 {...this.props} />
						<div className={styles.buttonContainer}>
							<Button
								size="medium"
								color="primary"
								className={styles.buttonNext}
								onClick={() => this.updateStep(2)}>
								Next
							</Button>
						</div>
					</div>
				)}
				{currentStep == 2 && (
					<div>
						<ConfirmBetStep2 {...this.props} />
						<div className={styles.buttonContainer}>
							<Button
								size="medium"
								color="white"
								onClick={() => this.updateStep(1)}>
								Back
							</Button>
							<Button
								size="medium"
								color="primary"
								onClick={() => {
									this.props.confirmBet();
									this.props.setCurrentModal(null);
								}}>
								Done
							</Button>
						</div>
					</div>
				)}
				<div className={styles.progressContainer}>
					<span className={styles.progressText}>
						Step {currentStep} of {totalSteps}
					</span>
					<div className={styles.progressBar}>
						<div
							className={styles.progress}
							style={{ width: `${currentStep / totalSteps * 100}%` }}
						/>
					</div>
				</div>
			</ModalWrapper>
		);
	}
}

ModalConfirmBet.propTypes = {
	confirmBet: PropTypes.func.isRequired,
	confirmingBet: PropTypes.object.isRequired,
	setCurrentModal: PropTypes.func.isRequired,
};

export default ModalConfirmBet;

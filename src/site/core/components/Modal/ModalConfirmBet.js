import React, { Component } from 'react';
import Immutable from 'immutable';
import ModalWrapper from './ModalWrapper';
import Button from '../Button'
import styles from './confirmBet.less';
import DemoQrImage from '../../../../img/demo-qr.png';

class ModalConfirmBet extends Component {
	constructor() {
		super();
		this.state = {
			currentStep: 1,
			totalSteps: 2,
		}
		this.updateStep = this.updateStep.bind(this);
	}

	updateStep(nextStep) {
		this.setState({
			currentStep: nextStep,
		})
	}

	render() {
		const { currentStep, totalSteps, showWarning } = this.state;
	  return (
	    <ModalWrapper {...this.props} title="Confirm your bet">
	    	{currentStep == 1 && 
	    		<div>
	    			<FormStepOne {...this.props} />
	    			<div className={styles.buttonContainerNext}>
	    				<Button onClick={() => this.updateStep(2)}>Next</Button>
	    			</div>
	    		</div>
	    	}
	    	{currentStep == 2 && 
	    		<div>
		    		<FormStepTwo {...this.props} />
		    		<div className={styles.buttonContainerPrev}>
		    			<Button onClick={() => this.updateStep(1)}>Back</Button>
		    		</div>
	    		</div>
	    	}
	    	<div>
	    		<span className={styles.progressText}>Step {currentStep} of {totalSteps}</span>
					<progress className={styles.progress} value={currentStep / totalSteps * 100} max="100"></progress>
				</div>
	    </ModalWrapper>
	  );
	}
}

export default ModalConfirmBet;

class FormStepOne extends Component {

	constructor() {
		super();
		this.state = {
			showOptions: false
		}
	}

	handleOptionsToggle() {
		this.setState({
			showOptions: !this.state.showOptions,
		})
	}

	render() {
		const { showOptions } = this.state
		const { confirmingBet } = this.props
		return (
			<div className={styles.formContainer}>
				<div className={styles.highlight}>
					<div className={styles.row}>
						<h5 className={styles.bodyHeading}>
							<span className={styles.bodyHeadingType}>{confirmingBet.getIn(['type'])}</span>
							{confirmingBet.getIn(['runner_name'])}
						</h5>
						<div className={styles.stake}>
							<span className={styles.stakeHeading}>Your stake</span>
							<div className={styles.stakeItem}>
								<span className={styles.stakeCurrency}>GAS</span>
								<span className={styles.stakeNumL}>2.50</span>
							</div>
							<div className={styles.stakeItem}>
								<span className={styles.stakeCurrency}>USD</span>
								<span className={styles.stakeNumS}>5453</span>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.infoToggle}>
					<a onClick={() => this.handleOptionsToggle()}>
						<i class={`fa fa-angle-${showOptions ? 'up' : 'down'}`} aria-hidden="true"></i>
					</a>
				</div>
				{showOptions && 
					<div>
						<div className={styles.info}>
							<p>{confirmingBet.getIn(['entity_name'])} | {confirmingBet.getIn(['market_name'])}<br />
							Date, Time</p>
						</div>
						<div className={styles.infoDetails}>
							<div className={styles.infoDetailsItem}>
								<span className={styles.infoDetailsItemHeading}>Odds</span>
								<span className={styles.infoDetailsItemNumber}>{confirmingBet.getIn(['odds'])}</span>
								<span className={styles.infoDetailsItemCurrency}>GAS</span>
							</div>
							<div className={styles.infoDetailsItem}>
								<span className={styles.infoDetailsItemHeading}>Stake</span>
								<span className={styles.infoDetailsItemNumber}>{confirmingBet.getIn(['stake'])}</span>
								<span className={styles.infoDetailsItemCurrency}>GAS</span>
							</div>
							<div className={styles.infoDetailsItem}>
								<span className={styles.infoDetailsItemHeading}>Profit</span>
								<span className={styles.infoDetailsItemNumber}>{confirmingBet.getIn(['profit'])}</span>
								<span className={styles.infoDetailsItemCurrency}>GAS</span>
							</div>
						</div>
					</div>
				}
			</div>
		)
	}
}


class FormStepTwo extends Component {
	
	constructor() {
		super();
		this.state = {
			warningTimeout: 800,
			showWarning: false,
		}
	}

	componentWillMount() {
		setTimeout(() => {
			this.setState({
				showWarning: true,
			})
		}, this.state.warningTimeout)
	}

	render() {
		const { showWarning } = this.state
		return (
			<div className={styles.formContainer}>
				{showWarning &&
					<div className={styles.warning}>
						<h6 className={styles.warningHeading}>Sorry! You can't bet right now.</h6>
						<p>This is a proof of concept demo, the Block Sports Exchange is not currently available. DO NOT send to this mock address.</p>
					</div>
				}
				<img src={DemoQrImage} className={styles.qr} />
				<div className={styles.highlight}>
					<span>eoRJdaIqxdek4fj4Fa98fj4cemkKPe0fj</span>
				</div>
			</div>
		)
	}
}
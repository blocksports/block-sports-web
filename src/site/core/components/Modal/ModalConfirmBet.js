import React, { Component } from 'react';
import Transition from 'react-transition-group/Transition';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import ModalWrapper from './ModalWrapper';
import classNames from 'classnames';
import Button from '../Button';
import Glyph from '../Glyph';
import styles from './confirmBet.less';
import { dateTime, dateTypes } from '../../../../lib/dateTime';
import { getMatchName } from '../../../../lib/utils';
import {
	fadeDefaultStyle,
	fadeTransitionStyles,
} from '../../../../lib/animation';

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
		const { currentStep, previousStep, totalSteps, showWarning } = this.state;
		const { confirmingBet } = this.props;
		const betType = confirmingBet.getIn(['type']);
		return (
			<ModalWrapper {...this.props} title="Confirm your bet">
				{currentStep == 1 && (
					<div>
						<FormStepOne {...this.props} />
						<div className={styles.buttonContainer}>
							<Button
								size="medium"
								extras={[betType]}
								className={styles.buttonNext}
								onClick={() => this.updateStep(2)}
							>
								Next
							</Button>
						</div>
					</div>
				)}

				{currentStep == 2 && (
					<div>
						<FormStepTwo {...this.props} />
						<div className={styles.buttonContainer}>
							<Button
								size="medium"
								extras={[betType]}
								onClick={() => this.updateStep(1)}
							>
								Back
							</Button>
							<Button
								size="medium"
								color="white"
								onClick={() => {
									this.props.confirmBet();
									this.props.setCurrentModal(null);
								}}
							>
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
							className={classNames([styles.progress, betType])}
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

class FormStepOne extends Component {
	constructor() {
		super();
		this.state = {
			showOptions: false,
		};
	}

	getStake(stake, priceUsd) {
		return {
			GAS: stake,
			USD: (stake * priceUsd).toFixed(2),
		};
	}

	getLiability(liability, priceUsd) {
		return {
			GAS: liability,
			USD: (liability * priceUsd).toFixed(2),
		};
	}

	getProfit(odds, stake) {
		const profit = (odds - 1) * stake;
		return profit >= 0 ? profit.toFixed(2) : 0;
	}

	getLayLiability(odds, stake) {
		return (odds * stake).toFixed(2);
	}

	render() {
		const { showOptions } = this.state;
		const { confirmingBet, price, activeCurrency } = this.props;
		const priceUsd = price.getIn(['GAS', 'USD']);
		const stake = this.getStake(confirmingBet.getIn(['stake']), priceUsd);
		const liability = this.getLiability(
			confirmingBet.getIn(['liability']),
			priceUsd
		);
		const betType = confirmingBet.getIn(['type']);
		return (
			<Transition appear={true} in={true} timeout={0}>
				{state => (
					<div
						className={styles.formContainer}
						style={{
							...fadeDefaultStyle,
							...fadeTransitionStyles[state],
						}}
					>
						<div className={styles.highlight}>
							<div className={styles.row}>
								<div>
									<span
										className={classNames([
											styles.bodyHeadingType,
											confirmingBet.getIn(['type']),
										])}
									>
										{confirmingBet.getIn(['type'])}
									</span>
									<h5 className={styles.bodyHeading}>
										{confirmingBet.getIn(['runner_name'])}
									</h5>
								</div>
								<div className={styles.stake}>
									<span className={styles.stakeHeading}>Your stake</span>
									<div className={styles.stakeItem}>
										<span className={styles.stakeValue}>{stake.GAS}</span>
										<span className={styles.stakeCurrency}>GAS</span>
									</div>
									<div className={styles.stakeItem}>
										<span className={styles.stakeValue}>{stake.USD}</span>
										<span className={styles.stakeCurrency}>USD</span>
									</div>
								</div>
							</div>
							<div>
								<div className={styles.info}>
									<span className={styles.truncate}>
										{confirmingBet.get('competition_name')} |{' '}
										{getMatchName(confirmingBet)}
									</span>
									<span>
										{dateTime(
											parseFloat(confirmingBet.get('commence')),
											dateTypes.dayMonthYearTime
										)}
									</span>
								</div>
								<div className={styles.infoDetails}>
									<div className={styles.infoDetailsItem}>
										<div className={styles.infoDetailsHeading}>
											<span>Odds</span>
										</div>
										<span className={styles.infoDetailsValue}>
											{confirmingBet.getIn(['odds'])}
										</span>
									</div>
									<div className={styles.infoDetailsItem}>
										<div className={styles.infoDetailsHeading}>
											<span>Stake</span>
											<span className={styles.infoDetailsCurrency}>
												{activeCurrency}
											</span>
										</div>
										<span className={styles.infoDetailsValue}>
											{stake[activeCurrency]}
										</span>
									</div>
									{betType === 'back' && (
										<div className={styles.infoDetailsItem}>
											<div className={styles.infoDetailsHeading}>
												<span>Profit</span>
												<span className={styles.infoDetailsCurrency}>
													{activeCurrency}
												</span>
											</div>
											<span className={styles.infoDetailsValue}>
												{this.getProfit(
													parseFloat(confirmingBet.getIn(['odds'])),
													stake[activeCurrency]
												)}
											</span>
										</div>
									)}
									{betType === 'lay' && (
										<div className={styles.infoDetailsItem}>
											<div className={styles.infoDetailsHeading}>
												<span>Liability</span>
												<span className={styles.infoDetailsCurrency}>
													{activeCurrency}
												</span>
											</div>
											<span className={styles.infoDetailsValue}>
												{this.getLayLiability(
													parseFloat(confirmingBet.getIn(['odds'])),
													stake[activeCurrency]
												)}
											</span>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				)}
			</Transition>
		);
	}
}

class FormStepTwo extends Component {
	constructor() {
		super();
		this.state = {
			warningTimeout: 3000,
			showWarning: false,
		};
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({
				showWarning: true,
			});
		}, this.state.warningTimeout);
	}

	render() {
		const { showWarning } = this.state;
		const { confirmingBet } = this.props;
		return (
			<Transition appear={true} in={true} timeout={0}>
				{state => (
					<div
						style={{
							...fadeDefaultStyle,
							...fadeTransitionStyles[state],
						}}
					>
						<div
							className={classNames([
								styles.formContainer,
								styles.formContainerStepTwo,
							])}
						>
							{showWarning && (
								<Transition appear={true} in={true} timeout={0}>
									{state => (
										<div
											style={{
												...fadeDefaultStyle,
												...fadeTransitionStyles[state],
											}}
										>
											<div className={styles.warning}>
												<h6 className={styles.warningHeading}>
													Sorry! You can't bet right now.
												</h6>
												<p>
													This is a proof of concept demo, the Block Sports
													Exchange is not currently available. DO NOT send to
													this mock address.
												</p>
											</div>
										</div>
									)}
								</Transition>
							)}
							<div className={styles.contractDetails}>
								<div>
									Send
									<span className={`color-${confirmingBet.getIn(['type'])}`}>
										{' '}
										{confirmingBet.getIn(['liability'])} GAS{' '}
									</span>
									to the contract below
								</div>
							</div>

							<div className={styles.contractAddress}>
								<span className={styles.contractAddressHeading}>
									Contract address desktop wallet
								</span>
								<span className={styles.contractAddressCode}>
									eoRJdaIqxdek4fj4Fa98fj4cemkKPe0fj
								</span>
							</div>
						</div>
					</div>
				)}
			</Transition>
		);
	}
}

import React, { Component } from 'react';
import Transition from 'react-transition-group/Transition';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { t } from 'i18next';
import { Tab, Tabs } from '../../Tabs';
import { dateTime, dateTypes } from '../../../../../lib/dateTime';
import { getMatchName } from '../../../../../lib/utils';
import {
	fadeDefaultStyle,
	fadeTransitionStyles,
} from '../../../../../lib/animation';
import styles from './styles.less';

class ConfirmBetStep1 extends Component {

	getBoxThreeContent(odds, stake) {
		const backersProfit = (odds - 1) * stake;
		return backersProfit >= 0 ? backersProfit.toFixed(2) : 0;
	}

	render() {
		const { confirmingBet, price } = this.props;
		const stake = confirmingBet.get('stake');
		const betType = confirmingBet.get('type');
		const liability = confirmingBet.get('liability');
		console.log(confirmingBet)
		return (
			<Transition appear={true} in={true} timeout={0}>
				{state => (
					<div
						className={styles.root}
						style={{
							...fadeDefaultStyle,
							...fadeTransitionStyles[state],
						}}
					>
						<div className={styles.inner}>
							<div className={styles.row}>
								<div>
									<span
										className={classNames([
											styles.bodyHeadingType,
											confirmingBet.get('type'),
										])}
									>
										{confirmingBet.get('type')}
									</span>
									<h5 className={styles.bodyHeading}>
										{confirmingBet.get('runner_name')}
									</h5>
								</div>
								<div className={styles.stake}>
									<span className={styles.stakeHeading}>
									{t(`core:confirm-modal.step-one.header-stake-${betType}`)}
									</span>
									<div className={styles.stakeItem}>
										<span className={styles.stakeValue}>{liability}</span>
										<span className={styles.stakeCurrency}>GAS</span>
									</div>
								</div>
							</div>
							<div>
								<div className={styles.info}>
									<span className={styles.infoCompName}>
										{confirmingBet.get('competition_name')}
									</span>
									<span className={styles.infoMatchName}>
										{getMatchName(confirmingBet)}
									</span>
									<span className={styles.infoDate}>
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
											{confirmingBet.get('odds')}
										</span>
									</div>
									<div className={styles.infoDetailsItem}>
										<div className={styles.infoDetailsHeading}>
											<span>Stake</span>
											<span className={styles.infoDetailsCurrency}>GAS</span>
										</div>
										<span className={styles.infoDetailsValue}>{stake}</span>
									</div>
									<div className={styles.infoDetailsItem}>
										<div className={styles.infoDetailsHeading}>
											<span>{t(`core:confirm-modal.step-one.box3-${betType}`)}</span>
											<span className={styles.infoDetailsCurrency}>GAS</span>
										</div>
										<span className={styles.infoDetailsValue}>
											{this.getBoxThreeContent(
												parseFloat(confirmingBet.getIn(['odds'])),
												stake
											)}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</Transition>
		);
	}
}

export default ConfirmBetStep1;

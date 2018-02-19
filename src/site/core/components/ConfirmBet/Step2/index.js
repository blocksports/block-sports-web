import React, { Component } from 'react';
import Transition from 'react-transition-group/Transition';
import classNames from 'classnames';
import NeoLinkPaymentMethod from './NeoLinkPaymentMethod';
import ManualPaymentMethod from './ManualPaymentMethod';
import { Tab, Tabs } from '../../Tabs';
import {
	fadeDefaultStyle,
	fadeTransitionStyles,
} from '../../../../../lib/animation';
import { confirmBetPaymentMethods, createConfirmBetPaymentFields } from '../../../../../lib/utils';
import styles from './styles.less';

class ConfirmBetStep2 extends Component {
	constructor() {
		super();
		this.state = {
			activePaymentMethod: confirmBetPaymentMethods[0].value,
		};
		this.handleTabClick = this.handleTabClick.bind(this);
	}

	handleTabClick(newMethod) {
		this.setState({
			activePaymentMethod: newMethod,
		});
	}

	render() {
		const { activePaymentMethod } = this.state;
		const { confirmingBet } = this.props;
		const liability = confirmingBet.get('liability');
		
		return (
			<Transition appear={true} in={true} timeout={0}>
				{state => (
					<div
						style={{
							...fadeDefaultStyle,
							...fadeTransitionStyles[state],
						}}
					>
						<div className={styles.root}>
							<Tabs className={styles.tabs}>
								{confirmBetPaymentMethods.map((method, i) => (
									<Tab
										key={i}
										onClick={() => this.handleTabClick(method.value)}
										className={
											activePaymentMethod === method.value ? 'active' : null
										}
									>
										{method.text}
									</Tab>
								))}
							</Tabs>
							{activePaymentMethod === 'neolink' && (
								<NeoLinkPaymentMethod stake={liability} />
							)}
							{activePaymentMethod === 'manual' && (
								<ManualPaymentMethod bet={confirmingBet} stake={liability} />
							)}
						</div>
					</div>
				)}
			</Transition>
		);
	}
}

export default ConfirmBetStep2;

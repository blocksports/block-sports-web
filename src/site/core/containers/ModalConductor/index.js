import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { setCurrentModal } from '../../reducers/modal';
import { acceptDemoWarning } from '../../reducers/user';
import { confirmBet } from '../../reducers/bet';
import ModalConfirmBet from '../../components/Modal/ModalConfirmBet';
import ModalMobileWarning from '../../components/Modal/ModalMobileWarning';
import ModalDemoWarning from '../../components/Modal/ModalDemoWarning';

export class ModalConductor extends Component {
	constructor(props) {
		super(props);
		this.dispatchMobileWarning = this.dispatchMobileWarning.bind(this);
	}

	componentDidMount() {
		// this.dispatchDemoWarning();
		this.dispatchMobileWarning();
		window.addEventListener('resize', this.dispatchMobileWarning);
	}

	dispatchMobileWarning() {
		const {
			currentModal,
			hasAcceptedDemoWarning,
			setCurrentModal,
		} = this.props;
		if (window.innerWidth < 1140) {
			setCurrentModal('mobileWarning');
		} else {
			if (currentModal === 'mobileWarning') {
				setCurrentModal(hasAcceptedDemoWarning ? null : 'demoWarning');
			}
		}
	}

	dispatchDemoWarning() {
		this.props.setCurrentModal('demoWarning');
	}

	render() {
		const {
			acceptDemoWarning,
			activeCurrency,
			confirmingBet,
			currentModal,
			hasAcceptedDemoWarning,
			price,
			setCurrentModal,
			confirmBet,
		} = this.props;
		switch (currentModal) {
			case 'confirmBet':
				return (
					<ModalConfirmBet
						setCurrentModal={setCurrentModal}
						confirmBet={confirmBet}
						confirmingBet={confirmingBet}
						price={price}
						activeCurrency={activeCurrency}
					/>
				);
			case 'demoWarning':
				return (
					<ModalDemoWarning
						setCurrentModal={setCurrentModal}
						acceptDemoWarning={acceptDemoWarning}
					/>
				);
			case 'mobileWarning':
				return (
					<ModalMobileWarning
						setCurrentModal={setCurrentModal}
						confirmingBet={confirmingBet}
						price={price}
						activeCurrency={activeCurrency}
					/>
				);
			default:
				return null;
		}
	}
}

const mapDispatchToProps = dispatch => {
	return {
		acceptDemoWarning: (...args) => {
			return dispatch(acceptDemoWarning(...args));
		},
		confirmBet: (...args) => {
			return dispatch(confirmBet(...args));
		},
		setCurrentModal: (...args) => {
			return dispatch(setCurrentModal(...args));
		},
	};
};

const mapStateToProps = state => {
	return {
		activeCurrency: state.getIn(['core', 'currency', 'activeCurrency']),
		confirmingBet: state.getIn(['core', 'bet', 'confirmingBet'], Immutable.Map),
		currentModal: state.getIn(['core', 'modal', 'currentModal']),
		hasAcceptedDemoWarning: state.getIn([
			'core',
			'user',
			'hasAcceptedDemoWarning',
		]),
		price: state.getIn(['core', 'currency', 'price'], Immutable.Map),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalConductor);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { setCurrentModal } from '../../reducers/modal';
import ModalConfirmBet from '../../components/Modal/ModalConfirmBet';
import ModalMobileWarning from '../../components/Modal/ModalMobileWarning';

export class ModalConductor extends Component {
	constructor(props) {
		super(props);
		this.dispatchMobileWarning = this.dispatchMobileWarning.bind(this);
	}

	componentDidMount() {
		this.dispatchMobileWarning();
		window.addEventListener('resize', this.dispatchMobileWarning);
	}

	dispatchMobileWarning() {
		const { currentModal, setCurrentModal } = this.props;
		if (window.innerWidth < 1140) {
			setCurrentModal('mobileWarning');
		} else {
			if (currentModal === 'mobileWarning') {
				setCurrentModal(null);
			}
		}
	}

	render() {
		const {
			currentModal,
			setCurrentModal,
			confirmingBet,
			price,
			activeCurrency,
		} = this.props;
		switch (currentModal) {
			case 'confirmBet':
				return (
					<ModalConfirmBet
						setCurrentModal={setCurrentModal}
						confirmingBet={confirmingBet}
						price={price}
						activeCurrency={activeCurrency}
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
		setCurrentModal: (...args) => {
			return dispatch(setCurrentModal(...args));
		},
	};
};

const mapStateToProps = state => {
	return {
		currentModal: state.getIn(['core', 'modal', 'currentModal']),
		confirmingBet: state.getIn(['core', 'bet', 'confirmingBet'], Immutable.Map),
		price: state.getIn(['core', 'currency', 'price'], Immutable.Map),
		activeCurrency: state.getIn(['core', 'currency', 'activeCurrency']),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalConductor);

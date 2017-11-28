import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { setCurrentModal } from '../../reducers/modal';
import ModalConfirmBet from '../../components/Modal/ModalConfirmBet'

const ModalConductor = ({currentModal, setCurrentModal, confirmingBet, price, activeCurrency}) => {
	switch (currentModal) {
  	case 'confirmBet':
    	return <ModalConfirmBet 
        setCurrentModal={setCurrentModal} 
        confirmingBet={confirmingBet} 
        price={price} 
        activeCurrency={activeCurrency}
      />
    default:
      return null;
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentModal: (...args) => {
      return dispatch(setCurrentModal(...args));
    }
  };
};

const mapStateToProps = (state) => {
	return {
		'currentModal': state.getIn(['core', 'modal', 'currentModal']),
		'confirmingBet': state.getIn(['core', 'bet', 'confirmingBet'], Immutable.Map),
    'price': state.getIn(['core', 'currency', 'price'], Immutable.Map),
    'activeCurrency': state.getIn(['core', 'currency', 'activeCurrency']),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalConductor);

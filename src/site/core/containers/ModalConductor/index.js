import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { setCurrentModal } from '../../reducers/modal';

import ModalConfirmBet from '../../components/Modal/ModalConfirmBet'

const ModalConductor = ({currentModal, setCurrentModal, confirmingBet}) => {
	switch (currentModal) {
  	case 'confirmBet':
    	return <ModalConfirmBet setCurrentModal={setCurrentModal} confirmingBet={confirmingBet} />
    default:
      return null;
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentModal: (...args) => {
      return dispatch(setCurrentModal(...args));
    },
  };
};

const mapStateToProps = (state) => {
	console.log(state);
	return {
		'currentModal': state.getIn(['core', 'modal', 'currentModal']),
		'confirmingBet': state.getIn(['core', 'bet', 'confirmingBet'], Immutable.Map),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalConductor);

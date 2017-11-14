import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

const ModalConductor = ({currentModal}) => {
	console.log(currentModal)
	switch (currentModal) {
  	case 'confirmBet':
    	return <div>PLACE A BET</div>
    	break;
    default:
      return <div>Nothing</div>
  }
};

const mapStateToProps = (state) => {
	return {
		'currentModal': state.getIn(['core', 'modal', 'currentModal'], Immutable.Map()),
	};
};

export default connect(mapStateToProps, null)(ModalConductor);

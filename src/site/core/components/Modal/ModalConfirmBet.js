import React from 'react';
import Immutable from 'immutable';

import ModalWrapper from './ModalWrapper';

const ModalConfirmBet = props => {
	console.log()
  return (
    <ModalWrapper {...props} title="Confirm your bet">
    	<FormStepOne {...props} />
    	<FormStepTwo {...props} />

    </ModalWrapper>
  );
};

const FormStepOne = props => {
	return (
		<div className="modal-form">
			<div className="modal-row">
				<div className="modal-col">
					<h5>
						<span>{props.confirmingBet.getIn(['type'])}</span>
						{props.confirmingBet.getIn(['runner_name'])}
					</h5>
				</div>
				<div className="modal-row">
					{props.confirmingBet.getIn(['entity_name'])} - {props.confirmingBet.getIn(['market_name'])}
					Date, Time
				</div>

				<div className="modal-col">
					<span>
						Odds<br />
						{props.confirmingBet.getIn(['odds'])}
					</span>
					<span>
						Stake<br />
						{props.confirmingBet.getIn(['stake'])}
					</span>
					<span>
						Profit<br />
						??
					</span>
				</div>
			</div>
		</div>
	)
}

const FormStepTwo = props => {
	return (
		<div className="modal-form">
			<div className="modal-row">
				Send {} GAS to NEO contract below

				erfoijrfiojfioej fie frh
			</div>
			Back button
		</div>
	)
}

export default ModalConfirmBet;
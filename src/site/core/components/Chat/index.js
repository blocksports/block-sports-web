import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { t } from 'i18next';
import classNames from 'classnames';
import styles from './style.less';

const demoMessages = [
	{
		username: 'UserBoy11',
		message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
	}, {
		username: 'UserBoy151',
		message: 'Duis mattis risus odio, sed finibus libero tincidunt a.'
	}, {
		username: 'UserBoy100',
		message: 'Etiam et eros mauris. Nullam rutrum ornare dolor.'
	}, {
		username: 'UserBoy221',
		message: 'Phasellus finibus magna quam, vitae efficitur metus rutrum nec.'
	}, {
		username: 'UserBoy52',
		message: 'Nullam nec sem et turpis fringilla euismod a et velit. Praesent quis aliquam diam.'
	}, {
		username: 'UserBoy98',
		message: 'Nulla congue, felis nec iaculis consequat, mi metus imperdiet tortor, eu tincidunt est dolor ac ex.'
	}, {
		username: 'UserBoy155',
		message: 'Etiam fermentum orci eu venenatis cursus. Donec aliquam ut enim a pharetra.'
	},
]

class Chat extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
    	messages: demoMessages
    }
  }

  handleFormSubmit(e) {
  	e.preventDefault();
  	this.setState({
  		messages: [...this.state.messages, {
  			username: 'UserBoy191',
  			message: '5049fj49f'
  		}]
  	})
  }

  render() {
    return (
	  	<div>
	  		<span className={styles.heading}>Heading</span>
	  		<div className={styles.body}>
	  			{this.state.messages.map((item, index) =>
	  				<ChatMessage message={item} key={index} />
	  			)}
	  		</div>
	  		<form className={styles.form} onSubmit={(e) => this.handleFormSubmit(e)}>
	  			<input className={styles.input} rows="2" placeholder="Type a message..." />
	  		</form>
	  	</div>
    );
  }

}

const ChatMessage = ({ message }) => 
	<div className={styles.chatMessage}>
		<span className={styles.chatMessageUsername}>{message.username}</span>
		<span className={styles.chatMessageMessage}>: {message.message}</span>
	</div>

Chat.propTypes = {
};

export default Chat;

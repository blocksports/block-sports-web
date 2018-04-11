import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { t } from 'i18next';
import classNames from 'classnames';
import styles from './style.less';

const demoMessages = [
	{
		username: 'Block Sports Bot',
		message: 'Welcome to the Block Sports Exchange! Please visit our <a href="https://www.blocksports.com" target="_blank" >website</a> for more information.',
	},
	{
		username: 'Block Sports Bot',
		message: 'Just a reminder that this is a demo exchange only, <b>do not</b> transfer any funds.'
	},
	{
		username: 'Block Sports Bot',
		message: 'You can keep up to date on news and announcements by joining our <a href="https//www.t.me/blocksports" target="_blank">Telegram</a> or following us on <a href="https://twitter.com/block_sports" target="_blank" >Twitter</a>.',
	},
	{
		username: 'Block Sports Bot',
		message: 'Also keep an eye out for our upcoming AMA on the <a href="https://www.reddit.com/r/neo" target="_blank" >NEO subreddit</a>.',
	},
	{
		username: 'Block Sports Bot',
		message:
			'Any questions or issues? Let us know at <a href="mailto:support@blocksports.com" target="_blank" >support@blocksports.com</a>.',
	},
];

const createMarkup = (message) => {
	return {__html: message};
};

var timer;


class Chat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showWarning: false,
			messages: [demoMessages[0]],
			messageIndex: 0
		};

		this.updateChat = this.updateChat.bind(this);
	}

	componentDidMount() {
		timer = setInterval(this.updateChat, 25000);
	}

	handleMouseEnter() {
		this.setState({
			showWarning: true,
		});
	}

	handleMouseLeave() {
		this.setState({
			showWarning: false,
		});
	}

	updateChat() {
		var messages = this.state.messages;
		const messageIndex = this.state.messageIndex + 1;
		messages.push(demoMessages[messageIndex]);

		this.setState({
			messages,
			messageIndex
		});

		if (messageIndex + 1 >= demoMessages.length) {
			clearTimeout(timer);
		}
	}

	render() {
		return (
			<div className={styles.root}
>
				<span className={styles.heading}>Chat</span>
				<div className={styles.body}
					>
					<TransitionGroup>
						{this.state.messages.map((item, index) => (
							<Fade key={index}>
								<ChatMessage message={item} key={index} />
							</Fade>
						))}
					</TransitionGroup>
				</div>
				<div 			
					onMouseEnter={() => this.handleMouseEnter()}
					onMouseLeave={() => this.handleMouseLeave()}>	
						{
							!this.state.showWarning && 	
							<form className={styles.form}>
								<textarea
									className={styles.input}
									rows="2"
									placeholder="Type a message..."
									disabled
								/>
							</form>
							
						}
						{ this.state.showWarning && <DisabledMessage/> }			
				</div>
			</div>
		);
	}
}

/*
	REMOVE DANGEROUSLYSETINNERHTML AFTER DEMO
*/
const ChatMessage = ({ message }) => {
	return (
	<div className={styles.chatMessage}>
		<span className={styles.chatMessageUsername}><b>{message.username}</b></span>
		<span className={styles.chatMessageMessage}>: <span dangerouslySetInnerHTML={createMarkup(message.message)}/></span>
	</div>
	)
};

const Fade = ({ children, ...props }) => (
	<CSSTransition {...props} timeout={300} classNames="fade">
		{children}
	</CSSTransition>
);

const DisabledMessage = () => (
	<div className={styles.disabledWrapper}>
		<div>
			<span>Chat is currently disabled</span>
		</div>
	</div>
);

Chat.propTypes = {};

export default Chat;

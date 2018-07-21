import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Scrollbars } from 'react-custom-scrollbars';
import AccurateTimer from 'accurate-timer-js';
import moment from 'moment';
import { dateTime, dateTypes } from '../../../../lib/dateTime';
import styles from './style.less';

const demoMessages = [
	{
		username: 'Admin',
		userID: '123456789',
		time: undefined,
		message: 'Welcome to the Block Sports Exchange! Please visit our <a href="https://www.blocksports.com" target="_blank" >website</a> for more information.',
	},
	{
		username: 'Admin',
		userID: '123456789',
		time: undefined,		
		message: 'You can keep up to date on news and announcements by joining our <a href="https://www.t.me/blocksports" target="_blank">Telegram</a> or following us on <a href="https://twitter.com/BlockSportsEx" target="_blank" >Twitter</a>.',
	},
	{
		username: 'Admin',
		userID: '123456789',
		time: undefined,
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

		demoMessages[0].time = moment().unix();

		this.state = {
			showWarning: false,
			messages: [demoMessages[0]],
			messageIndex: 0,
			firstMessageTime: 0,
			firstUser: ''
		};

		this.updateChat = this.updateChat.bind(this);
	}

	componentDidMount() {
		timer = new AccurateTimer(this.updateChat, 30000);
		timer.start();
	}

	componentDidUpdate(_, prevState) {
		if (prevState.messageIndex != this.state.messageIndex) {
			this.scrollToBottom();
		} 

		if (!this.state.chatHeight) {
			this.state.chatHeight = this.scrollBarChat ? this.scrollBarChat.container.clientHeight : undefined;
		} else if(this.scrollBarChat.container.clientHeight != this.state.chatHeight) {
			this.state.chatHeight = this.scrollBarChat.container.clientHeight;
		}
	}

	get renderMessagesByUser() {
		let arr = [];
		let prevUser;

		this.state.messages.forEach(item => {
			const user = item.userID;

			// Check if first message was within 5 mins of this one or if a new user has messaged
			if ((item.time - this.state.firstMessageTime) > 300000 || user !== prevUser) {
				arr.push([]);
				this.state.firstMessageTime = item.time;	
				this.state.firstUser = item.username;
			} 

			prevUser = user;
			arr[arr.length - 1].push(item);	
		});

		return arr.map((item, index) => {
			return (	
				<div className={styles.chatGroup} key={index}>
					<div className={styles.messageHeader}>
						<span className={styles.username}>{this.state.firstUser}</span><span className={styles.time}>{dateTime(this.state.firstMessageTime, dateTypes.calendarDay)} {dateTime(this.state.firstMessageTime, dateTypes.time)}</span>
					</div>
					{item.map((message, index) => (
						<ChatMessage message={message} key={index} />
					))}
				</div>
			);
		});
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

	scrollToBottom = () => {
		this.messagesEnd.scrollIntoView({ behavior: "smooth" });
	}

	updateChat() {
		var messages = this.state.messages;
		const messageIndex = this.state.messageIndex + 1;
		demoMessages[messageIndex].time = moment().unix();
		messages.push(demoMessages[messageIndex]);

		this.setState({
			messages,
			messageIndex
		});

		if (messageIndex + 1 >= demoMessages.length) {
			timer.stop();
		}
	}

	render() {
		const chatHeightStyle = { height: this.state.chatHeight ? this.state.chatHeight : 'inherit'};
		return (
			<div className={styles.root}>
				<div className={styles.body}>
					<Scrollbars ref={(el) => { this.scrollBarChat = el; }}>
						<div className={styles.chat}>		
							<div className={styles.spaceFill}/>		
							{this.renderMessagesByUser}
							<div style={{ float:"left", clear: "both" }}
								ref={(el) => { this.messagesEnd = el; }}/>	
						</div>
					</Scrollbars>
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
		<span className={styles.chatMessageMessage}><span dangerouslySetInnerHTML={createMarkup(message.message)}/></span>
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

import React, { Component } from "react";
import PropTypes from "prop-types";
import Immutable from "immutable";
import { t } from "i18next";
import { shuffle } from "lodash";
import classNames from "classnames";
import styles from "./style.less";

const demoMessages = [
	{
		username: "User1242",
		message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
	},
	{
		username: "User151342",
		message: "Duis mattis risus odio, sed finibus libero tincidunt a."
	},
	{
		username: "User4345",
		message: "Etiam et eros mauris. Nullam rutrum ornare dolor."
	},
	{
		username: "User1131",
		message: "Phasellus finibus magna quam, vitae efficitur metus rutrum nec."
	},
	{
		username: "User9504",
		message:
			"Nullam nec sem et turpis fringilla euismod a et velit. Praesent quis aliquam diam."
	},
	{
		username: "User43",
		message:
			"Nulla congue, felis nec iaculis consequat, mi metus imperdiet tortor, eu tincidunt est dolor ac ex."
	}
];

class Chat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showWarning: false,
			messages: demoMessages
		};
	}

	handleMouseEnter() {
		this.setState({
			showWarning: true
		});
	}

	handleMouseLeave() {
		this.setState({
			showWarning: false
		});
	}

	render() {
		return (
			<div
				className={styles.root}
				onMouseEnter={() => this.handleMouseEnter()}
				onMouseLeave={() => this.handleMouseLeave()}
			>
				<span className={styles.heading}>Chat</span>
				<div className={styles.body}>
					{this.state.messages.map((item, index) => (
						<ChatMessage message={item} key={index} />
					))}
				</div>
				<form className={styles.form}>
					<textarea
						className={styles.input}
						rows="2"
						placeholder="Type a message..."
					/>
				</form>
				{this.state.showWarning && <DisabledMessage />}
			</div>
		);
	}
}

const ChatMessage = ({ message }) => (
	<div className={styles.chatMessage}>
		<span className={styles.chatMessageUsername}>{message.username}</span>
		<span className={styles.chatMessageMessage}>: {message.message}</span>
	</div>
);

const DisabledMessage = () => (
	<div className={styles.disabledMessage}>
		<span>Chat is currently disabled</span>
	</div>
);

Chat.propTypes = {};

export default Chat;

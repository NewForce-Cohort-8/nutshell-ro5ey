import {
	getMessages,
	sendMessage,
	getUsers,
	deleteMessage,
	getReactions,
	sendReaction,
	deleteReaction,
	updateReaction,
} from "./dataAccess.js";

//grab container
const mainContainer = document.querySelector(".container");

//get active user key value from sessionStorage window object

//set matchedUser to null
let matchedUser = null;

const ReactionButtons = (userId, messageId) => {
	const allReactions = getReactions();
	const likedSum = allReactions.filter(
		(reaction) =>
			reaction.userId === userId &&
			reaction.messageId === messageId &&
			reaction.liked
	).length;
	const disklikedSum = allReactions.filter(
		(reaction) =>
			reaction.userId === userId &&
			reaction.messageId === messageId &&
			!reaction.liked
	).length;
	return `<button type="button" id="like--${userId}--${messageId}" class="like-button">👍 ${likedSum}</button><button type="button" id="dislike--${userId}--${messageId}" class="dislike-button">👎 ${disklikedSum}</button>`;
};

//create message input function
const MessageInput = () => {
	const userId = sessionStorage.getItem("activeUser");
	//get all users
	const allUsers = getUsers();

	//match current user to active user
	matchedUser = allUsers.find((user) => user.id === parseInt(userId));

	//return a section for username,message, and send button
	return `<section class="field row send-message-inputs">
    <div class="column" id="chatBars">
    <input id="user--${userId}" type="text" placeholder="User: ${matchedUser.name}" name="chatUser" class="chat-bar">
    <input type="text" placeholder="New message" name="chat" class="chat-bar">
    </div>
    <button type="submit" class="chat-submit" id="send">Send</button>
    </section>`;
};

//create chat history function
const ChatHistory = () => {
	const userId = sessionStorage.getItem("activeUser");
	//get all users
	const allUsers = getUsers();

	//get all messages
	const allMessages = getMessages();

	//reverse the messages order
	const reversedMessages = allMessages.reverse();

	//match user to active user
	let matchedUser = null;

	//create section for chat history
	let html = `<section class="column" id="chat-history">`;

	//map through the reversed messages
	reversedMessages.map((message) => {
		matchedUser = allUsers.find((user) => user.id === parseInt(userId));
		//display message username, message, and delete button which is currently hidden
		html += `
        <div class="column chat-item" id="chat--${message.id}">
        
        <div id="userName--${matchedUser.id}"class="user-name">${
			matchedUser.name
		}</div>
       
        <div id="${message.userId}--${message.id}" class="message">${
			message.message
		}
        </div>
        <div class="row message-footer">
        <div class="reactions">${ReactionButtons(
					matchedUser.id,
					message.id
				)}</div>
        <button type="button" id="delete-message--${
					message.id
				}" class="delete-button hidden">Delete Message</button>
                </div>
        </div>`;
	});
	html += `</section>`;
	return html;
};

//combine chathistory and message inputs
export const Chat = () => {
	return `
    <article class="chat-component column" id="chats">
    ${ChatHistory()}
	${MessageInput()}
    </article>
    `;
};

//click event listenters
mainContainer.addEventListener("click", (event) => {
	const userId = sessionStorage.getItem("activeUser");

	//if clicking send button, send message to database
	if (event.target.id === "send") {
		const allUsers = getUsers();

		const userMessage = document.querySelector("input[name='chat']").value;
		const userName = document.querySelector("input[name='chatUser']").value;
		matchedUser = allUsers.find((user) => user.id === parseInt(userId));
		const messageToSendToAPI = {
			userId: parseInt(userId),
			message: userMessage,
		};

		//usermessage input has to have a value
		if (userMessage) {
			matchedUser = allUsers.find((user) => user.id === parseInt(userId));
			//username has to match active user
			if (matchedUser.name.toLowerCase() === userName.toLowerCase()) {
				sendMessage(messageToSendToAPI);
			} else {
				//otherwise alert user
				window.alert("Wrong user name");
			}
		}
	}
	//if clicking delete button
	if (event.target.id.startsWith("delete-message")) {
		const [, messageId] = event.target.id.split("--");
		//delete message
		deleteMessage(parseInt(messageId));
	}
	//if clicking message
	if (event.target.id.startsWith(userId)) {
		const [, messageId] = event.target.id.split("--");
		const thisMessage = event.target;
		const thisMessageWrapper = thisMessage.parentElement;
		const thisMessageButton = document.querySelector(
			`#delete-message--${messageId}`
		);
		//display delete button and highlight message
		if (thisMessageButton.classList.contains("hidden")) {
			thisMessageButton.classList.remove("hidden");
			thisMessageWrapper.classList.add("message-wrapper");
		} else {
			//remove delete button and highlight from message
			thisMessageButton.classList.add("hidden");
			thisMessageWrapper.classList.remove("message-wrapper");
		}
	}
	//if clicking like button
	if (event.target.id.startsWith("like")) {
		const allReactions = getReactions();
		//get userId and messageId from event click
		const [, userId, messageId] = event.target.id.split("--");
		//create reaction object
		let userReaction = {
			userId: parseInt(userId),
			messageId: parseInt(messageId),
			liked: true,
		};
		//find matching reaction
		let matchedReaction = allReactions.find((reaction) => {
			return (
				reaction.userId === parseInt(userId) &&
				reaction.messageId === parseInt(messageId)
			);
		});
		//if there is no matching reaction in the bridge table
		if (!matchedReaction) {
			//create reaction in bridge table and set liked to true
			sendReaction(userReaction);

			//if matching reaction liked property is false
		} else if (matchedReaction.liked === false) {
			userReaction = {
				liked: true,
			};
			//update matching reaction liked property to true
			updateReaction(userReaction, matchedReaction.id);

			//if matching reaction liked property is already true
		} else if (matchedReaction.liked === true) {
			//delete matching reaction from bridge table
			deleteReaction(matchedReaction.id);
		}
	}
	//if clicking dislike button
	if (event.target.id.startsWith("dislike")) {
		//get all reactions
		const allReactions = getReactions();
		//get userId and messageId from event click
		const [, userId, messageId] = event.target.id.split("--");
		//create user reaction object
		let userReaction = {
			userId: parseInt(userId),
			messageId: parseInt(messageId),
			liked: false,
		};
		//find matching reaction in bridge table
		let matchedReaction = allReactions.find((reaction) => {
			return (
				reaction.userId === parseInt(userId) &&
				reaction.messageId === parseInt(messageId)
			);
		});
		//if there is no matching reaction in the bridge table
		if (!matchedReaction) {
			//create the user reaction in the bridge table and set liked property to false
			sendReaction(userReaction);

			//if there is a matching reaction in the bridge table and it's liked property is true
		} else if (matchedReaction.liked === true) {
			userReaction = {
				liked: false,
			};
			//update matching reaction's liked property to false
			updateReaction(userReaction, matchedReaction.id);

			//if matched reaction exists and it's liked property is false already
		} else if (matchedReaction.liked === false) {
			//delete matching reaction from bridge table
			deleteReaction(matchedReaction.id);
		}
	}
});

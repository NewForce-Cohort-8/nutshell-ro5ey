import {
	getMessages,
	sendMessage,
	getUsers,
	deleteMessage,
	getReactions,
	sendReaction,
	deleteReaction,
} from "./dataAccess.js";

//grab container
const mainContainer = document.querySelector(".container");

//get active user key value from sessionStorage window object

//set matchedUser to null
let matchedUser = null;

const ReactionButtons = (userId, messageId) => {};

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
	let html = `<section class="chat-history column">`;

	//map through the reversed messages
	reversedMessages.map((message) => {
		matchedUser = allUsers.find((user) => user.id === parseInt(userId));
		//display message username, message, and delete button which is currently hidden
		html += `
        <div class="column chat-item" id="chat--${message.id}">
        <div id="userName--${matchedUser.id}"class="user-name">${matchedUser.name}</div>
        <div id="${message.userId}--${message.id}" class="message">${message.message}
        </div>
        <button type="button" id="delete--${message.id}" class="delete-button hidden">Delete Message</button>
        </div>`;
	});
	html += `</section>`;
	return html;
};

//combine chathistory and message inputs
export const Chat = () => {
	return `
    <article class="chat-component column">
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
	if (event.target.id.startsWith("delete")) {
		const [, messageId] = event.target.id.split("--");
		//delete message
		deleteMessage(parseInt(messageId));
	}
	if (event.target.id.startsWith(userId)) {
		const [, messageId] = event.target.id.split("--");
		const thisMessage = event.target;
		const thisMessageWrapper = thisMessage.parentElement;
		const thisMessageButton = document.querySelector(`#delete--${messageId}`);
		//display delete button and highlight message
		if (thisMessageButton.classList.contains("hidden")) {
			thisMessageButton.classList.remove("hidden");
			thisMessageWrapper.classList.add("message-wrapper");
			eventHub.dispatchEvent(new CustomEvent("stateChanged"));
		} else {
			//remove delete button and highlight from message
			thisMessageButton.classList.add("hidden");
			thisMessageWrapper.classList.remove("message-wrapper");
			eventHub.dispatchEvent(new CustomEvent("stateChanged"));
		}
	}
});

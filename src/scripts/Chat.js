import {
	getMessages,
	sendMessage,
	getUsers,
	deleteMessage,
} from "./dataAccess.js";

//grab container
const eventHub = document.querySelector(".container");

//grab dashboard
const contentTarget = document.querySelector(".dashboard");

//get active user key value from sessionStorage window object
const userId = sessionStorage.getItem("activeUser");

//set matchedUser to null
let matchedUser = null;

//create message input function
const MessageInput = () => {
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
	//get all users
	const allUsers = getUsers();

	//get all messages
	const allMessages = getMessages();

	//reverse the messages order
	const reversedMessages = allMessages.reverse();

	//match user to active user
	matchedUser = allUsers.find((user) => user.id === parseInt(userId));

	//create section for chat history
	let html = `<section class="chat-history column">`;

	//map through the reversed messages
	reversedMessages.map((message) => {
		//display message username, message, and delete button which is currently hidden
		html += `
        <div class="column chat-item" id="chat--${message.id}">
        <div id="user--${matchedUser.id}"class="user-name">${matchedUser.name}</div>
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
	contentTarget.innerHTML += `
    <article class="chat-component column">
    ${ChatHistory()}
	${MessageInput()}
    </article>
    `;
};

//click event listenters
eventHub.addEventListener("click", (event) => {
	//if clicking send button, send message to database
	if (event.target.id === "send") {
		const allUsers = getUsers();
		const userId = sessionStorage.getItem("activeUser");
		const userMessage = document.querySelector("input[name='chat']").value;
		const userName = document.querySelector("input[name='chatUser']").value;
		matchedUser = allUsers.find((user) => user.id === parseInt(userId));
		const messageToSendToAPI = {
			userId: parseInt(userId),
			message: userMessage,
		};
		//usermessage input has to have a value
		if (userMessage) {
			//username has to match active user
			if (matchedUser.name.toLowerCase() === userName.toLowerCase()) {
				sendMessage(messageToSendToAPI);
			} else {
				//otherwise alert user
				window.alert("Wrong user name");
			}
		}
		//if clicking delete button
		if (event.target.id.startsWith("delete")) {
			const [, messageId] = event.target.id.split("--");
			//delete message
			deleteMessage(parseInt(messageId));
		}
		//if clicking message
		if (event.target.id.startsWith(userId)) {
			const [, messageId] = event.target.id.split("--");
			const thisMessage = event.target;
			const thisMessageWrapper = thisMessage.parentElement;
			const thisMessageButton = document.querySelector(`#delete--${messageId}`);
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
	}
});

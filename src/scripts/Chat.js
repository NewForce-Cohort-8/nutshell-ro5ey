import {
	getMessages,
	sendMessage,
	getUsers,
	deleteMessage,
} from "./dataAccess.js";

const eventHub = document.querySelector(".container");

const contentTarget = document.querySelector(".dashboard");

const userId = sessionStorage.getItem("activeUser");
let matchedUser = null;

const MessageInput = () => {
	const allUsers = getUsers();
	matchedUser = allUsers.find((user) => user.id === parseInt(userId));
	return `<section class="field row send-message-inputs">
    <div class="column" id="chatBars">
    <input id="user--${userId}" type="text" placeholder="User: ${matchedUser.name}" name="chatUser" class="chat-bar">
    <input type="text" placeholder="New message" name="chat" class="chat-bar">
    </div>
    <button type="submit" class="chat-submit" id="send">Send</button>
    </section>`;
};

const ChatHistory = () => {
	const allUsers = getUsers();
	const allMessages = getMessages();
	const reversedMessages = allMessages.reverse();
	matchedUser = allUsers.find((user) => user.id === parseInt(userId));
	let html = `<section class="chat-history column">`;
	reversedMessages.map((message) => {
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
export const Chat = () => {
	contentTarget.innerHTML += `
    <article class="chat-component column">
    ${ChatHistory()}
	${MessageInput()}
    </article>
    `;
};

eventHub.addEventListener("click", (event) => {
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
		if (matchedUser.name.toLowerCase() === userName.toLowerCase()) {
			sendMessage(messageToSendToAPI);
		} else {
			window.alert("Wrong user name");
		}
	}
	if (event.target.id.startsWith("delete")) {
		const [, messageId] = event.target.id.split("--");
		deleteMessage(parseInt(messageId));
	}
	if (event.target.id.startsWith(userId)) {
		const [, messageId] = event.target.id.split("--");
		const thisMessage = event.target;
		const thisMessageWrapper = thisMessage.parentElement;
		const thisMessageButton = document.querySelector(`#delete--${messageId}`);
		if (thisMessageButton.classList.contains("hidden")) {
			thisMessageButton.classList.remove("hidden");
			thisMessageWrapper.classList.add("message-wrapper");
		} else {
			thisMessageButton.classList.add("hidden");
			thisMessageWrapper.classList.remove("message-wrapper");
		}
	}
});

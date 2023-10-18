let applicationState = {};

const API = "http://localhost:8088";

const dashboard = document.querySelector(".dashboard");
const main = document.querySelector(".container");

//fetch message
export const fetchMessages = () => {
	return fetch(`${API}/messages`)
		.then((response) => response.json())
		.then((messages) => {
			applicationState.messages = messages;
		});
};

//save messages to application state
export const getMessages = () => {
	return applicationState.messages.map((message) => ({ ...message }));
};

//delete message from database
export const deleteMessage = (id) => {
	return fetch(`${API}/messages/${id}`, {
		method: "DELETE",
	}).then(() => {
		main.dispatchEvent(new CustomEvent("stateChanged"));
	});
};

//fetch users
export const fetchUsers = () => {
	return fetch(`${API}/users`)
		.then((response) => response.json())
		.then((users) => {
			applicationState.users = users;
		});
};

//copy users
export const getUsers = () => {
	return applicationState.users.map((user) => ({ ...user }));
};

//fetch options for post
const fetchOptions = (obj) => {
	return {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(obj),
	};
};

//send message to database
export const sendMessage = (userMessage) => {
	return fetch(`${API}/messages`, fetchOptions(userMessage))
		.then((response) => {
			return response.json();
		})
		.then(() => {
			main.dispatchEvent(new CustomEvent("stateChanged"));
		});
};

export const fetchMessageReactions = () => {
	return fetch(`${API}/messageReactions`)
		.then((response) => response.json())
		.then((reactions) => {
			applicationState.messageReactions = reactions;
		});
};

export const getReactions = () => {
	return applicationState.messageReactions.map((reaction) => ({ ...reaction }));
};

export const sendReaction = (userReaction) => {
	return fetch(`${API}/messageReactions`, fetchMessageReactions(userReaction))
		.then((response) => {
			return response.json();
		})
		.then(() => {
			main.dispatchEvent(new CustomEvent("stateChanged"));
		});
};

export const deleteReaction = (id) => {
	return fetch(`${API}/messageReactions/${id}`, {
		method: "DELETE",
	}).then(() => {
		main.dispatchEvent(new CustomEvent("stateChanged"));
	});
};

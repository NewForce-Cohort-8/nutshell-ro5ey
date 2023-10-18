let applicationState = {};

const API = "http://localhost:8088";

const dashboard = document.querySelector(".dashboard");

export const fetchMessages = () => {
	return fetch(`${API}/messages`)
		.then((response) => response.json())
		.then((messages) => {
			applicationState.messages = messages;
		});
};

export const getMessages = () => {
	return applicationState.messages.map((message) => ({ ...message }));
};

export const deleteMessage = (id) => {
	return fetch(`${API}/messages/${id}`, {
		method: "DELETE",
	}).then(() => {
		dashboard.dispatchEvent(new CustomEvent("stateChanged"));
	});
};

export const fetchUsers = () => {
	return fetch(`${API}/users`)
		.then((response) => response.json())
		.then((users) => {
			applicationState.users = users;
		});
};

export const getUsers = () => {
	return applicationState.users.map((user) => ({ ...user }));
};
const fetchOptions = (obj) => {
	return {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(obj),
	};
};

export const sendMessage = (userMessage) => {
	return fetch(`${API}/messages`, fetchOptions(userMessage))
		.then((response) => {
			return response.json();
		})
		.then(() => {
			dashboard.dispatchEvent(new CustomEvent("stateChanged"));
		});
};

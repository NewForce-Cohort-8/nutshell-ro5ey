let applicationState = {};
const API = "http://localhost:8088";
const mainContainer = document.querySelector(".container");
export const fetchNews = () => {
	return fetch(`${API}/news`)
		.then((response) => response.json())
		.then((newsArticles) => {
			applicationState.news = newsArticles;
		});
};

//returns a copy of the news state//
export const getNews = () => {
	return applicationState.news.map((article) => ({ ...article }));
};

export const sendArticle = (userNewsArticle) => {
	const fetchOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userNewsArticle),
	};

	return fetch(`${API}/news`, fetchOptions)
		.then((response) => response.json())
		.then(() => {
			mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
		});
};

//Function whose responsiblity it is to initiate the fetch request for DELETE, the primary key sent to it as an argument.//

export const deleteNewsArticle = (id) => {
	return fetch(`${API}/news/${id}`, { method: "DELETE" }).then(() => {
		mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
	});
};

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
		mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
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

const fetchUpdate = (obj) => {
	return {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(obj),
	};
};

export const updateReaction = (userReaction, reactionId) => {
	return fetch(
		`${API}/messageReactions/${reactionId}`,
		fetchUpdate(userReaction)
	)
		.then((response) => {
			return response.json();
		})
		.then(() => {
			main.dispatchEvent(new CustomEvent("stateChanged"));
		});
};

//send message to database
export const sendMessage = (userMessage) => {
	return fetch(`${API}/messages`, fetchOptions(userMessage))
		.then((response) => {
			return response.json();
		})
		.then(() => {
			mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
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
	return fetch(`${API}/messageReactions`, fetchOptions(userReaction))
		.then((response) => {
			return response.json();
		})
		.then(() => {
			mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
		});
};

export const deleteReaction = (id) => {
	return fetch(`${API}/messageReactions/${id}`, {
		method: "DELETE",
	}).then(() => {
		mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
	});
};

export const setScrollHeight = () => {
	const chatHistory = document.querySelector("#chat-history");
	sessionStorage.setItem("chatScroll", chatHistory.scrollTop);
	let userChatScroll = sessionStorage.getItem(
		"chatScroll",
		chatHistory.scrollTop
	);
	chatHistory.scrollTop = parseInt(userChatScroll);
};

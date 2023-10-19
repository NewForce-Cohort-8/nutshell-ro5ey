const applicationState = {
    users: [],
    tasks: [],
    messages: [],
}


const mainContainer = document.querySelector("#container")
const dashboard = document.querySelector(".dashboard");
const main = document.querySelector(".container");

const API = "http://localhost:8088"


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

export const fetchTasks = () => {
    return fetch(`${API}/tasks`)
    .then((response) => response.json())
    .then((tasks) => {
        applicationState.tasks = tasks;
    })
};
export const getTasks = () => {
    return applicationState.tasks.map(task => ({...task}))
};
export const deleteTasks = (id) => {
    return fetch(`${API}/tasks/${id}`, {
        method: "DELETE", 
    }).then(() => {
        main.dispatchEvent(new CustomEvent("stateChanged"));
    })
};
//send message to database
export const sendTasks = (userTask) => {
	return fetch(`${API}/tasks`, fetchOptions(userTask))
		.then((response) => {
			return response.json();
		})
		.then(() => {
			mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
		});
};



//fetching news data from the API and storing it in application state://


export const fetchNews = () => {
    return fetch(`${API}/news`)
        .then(response => response.json())
        .then(
            (newsArticles) => {               
                applicationState.news = newsArticles
            }
        )
}

//returns a copy of the news state//
export const getNews = () => {
    return applicationState.news.map(article => ({...article}))
}

export const sendArticle = (userNewsArticle) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userNewsArticle)
    }


    return fetch(`${API}/news`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

//Function whose responsiblity it is to initiate the fetch request for DELETE, the primary key sent to it as an argument.//

export const deleteNewsArticle = (id) => {
    return fetch(`${API}/news/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

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


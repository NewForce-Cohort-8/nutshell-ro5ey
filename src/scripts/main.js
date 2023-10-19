import { LoginForm } from "./auth/LoginForm.js";
import { RegisterForm } from "./auth/RegisterForm.js";
import { Nutshell } from "./Nutshell.js";
import {
	fetchUsers,
	fetchMessages,
	fetchMessageReactions,
} from "./dataAccess.js";
import { fetchChuckFact } from "./ChuckNorris.js";
import { fetchDadJoke } from "./DadJokes.js";

/*
    1. Check if the user is authenticated by looking in session storage for `activeUser`
    2. If so, render the Nutshell component
    3. If not, render the login and registration forms
    4. Also, if the user authenticates, and the login form is initially shown
        ensure that the Nutshell component gets rendered
*/

const mainContainer = document.querySelector(".container");
const render = () => {
	fetchUsers()
		.then(() => fetchMessages())
		.then(() => fetchMessageReactions())
		.then(() => fetchChuckFact())
		.then(() => fetchDadJoke())
		.then(() => {
			const activeUser = sessionStorage.getItem("activeUser");
			if (!activeUser) {
				mainContainer.innerHTML = LoginForm() + RegisterForm();
			} else {
				mainContainer.innerHTML = Nutshell();
			}
		});
};

render();

mainContainer.addEventListener("stateChanged", (customEvent) => {
	render();
});

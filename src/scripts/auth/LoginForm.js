import { fetchUsers, getUsers } from "../dataAccess.js";
const eventHub = document.querySelector(".container");

// When the user clicks the login button
eventHub.addEventListener("click", (e) => {
	if (e.target.id === "login__button") {
		// Get their email from the login form
		const email = document.querySelector("#login__email").value;

		// Query the databaes for users that have that email
		return fetchUsers().then(() => {
			const allUsers = getUsers();

			// if a matching user is found (i.e. if the user exists in the database)
			if (allUsers.length > 0) {
				const user = allUsers.find((user) => user.email === email);
				if (user) {
					// Add their id to session storage, which logs them in
					sessionStorage.setItem("activeUser", user.id);
					eventHub.dispatchEvent(new CustomEvent("stateChanged"));
				} else {
					window.alert("User does not exist! 😭 Please register.");
				}
			}
		});
	}
});

export const LoginForm = () => {
	return `
    <section class="login">
        <input id="login__email" type="text" placeholder="Log In With Email">
        <button id="login__button">Log In</button>
    </section>
`;
};

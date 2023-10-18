import { LogOutButton } from "./auth/LogoutButton.js";
import { Chat } from "./Chat.js";
import { fetchMessages, fetchUsers } from "./dataAccess.js";

export const Nutshell = () => {
	LogOutButton();
	// Render all your UI components here
	fetchUsers()
		.then(() => fetchMessages())
		.then(() => {
			Chat();
		});
};

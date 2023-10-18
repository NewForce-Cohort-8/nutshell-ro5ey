import { LogOutButton } from "./auth/LogoutButton.js";
import { Chat } from "./Chat.js";
import { fetchMessages, fetchUsers } from "./dataAccess.js";

export const Nutshell = () => {
	LogOutButton();
	// Render all your UI components here

	//Chat feature
	//fetch users then messages from database
	fetchUsers()
		.then(() => fetchMessages())
		.then(() => {
			//render chat feature
			Chat();
		});
};

import { LogOutButton } from "./auth/LogoutButton.js";
import { Chat } from "./Chat.js";
import { fetchMessages, fetchUsers } from "./dataAccess.js";

export const Nutshell = () => {
	return `${LogOutButton()}
	${Chat()}`;
};

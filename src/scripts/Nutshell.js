import { LogOutButton } from "./auth/LogoutButton.js";
import { Chat } from "./Chat.js";
import { DadJokes } from "./DadJokes.js";

export const Nutshell = () => {
	return `${LogOutButton()}
	${Chat()}${DadJokes()}`;
};

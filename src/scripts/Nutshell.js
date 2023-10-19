import { LogOutButton } from "./auth/LogoutButton.js";
import { Chat } from "./Chat.js";
import { DadJokes } from "./DadJokes.js";
import { ChuckNorrisFacts } from "./ChuckNorris.js";

export const Nutshell = () => {
	return `${LogOutButton()}
	${Chat()}${ChuckNorrisFacts()}${DadJokes()}`;
};

import { LogOutButton } from "./auth/LogoutButton.js";
import { getTasks } from "./dataAccess.js";
import { TaskForm } from "./TaskForm.js";
import { TaskList } from "./Tasks.js";
import { Chat } from "./Chat.js";
import { News } from "./news.js";
import { DadJokes } from "./DadJokes.js";
import { ChuckNorrisFacts } from "./ChuckNorris.js";
import { RandomActivities } from "./RandomActivity.js";
import { Breweries } from "./Breweries.js";

export const Nutshell = () => {
	return `${LogOutButton()}
	${Chat()}    
    ${News()}        
    ${TaskList()}${ChuckNorrisFacts()}${DadJokes()}${RandomActivities()}${Breweries()}
    `;
};

import { LogOutButton } from "./auth/LogoutButton.js";
import { Chat } from "./Chat.js";
import { News } from "./news.js";
import { DadJokes } from "./DadJokes.js";
import { ChuckNorrisFacts } from "./ChuckNorris.js";
import { RandomActivities } from "./RandomActivity.js";
import { Breweries } from "./Breweries.js";

export const Nutshell = () => {
	return `${LogOutButton()}
	${Chat()}<div class="news">    
  ${News()}        
  </div>${ChuckNorrisFacts()}${DadJokes()}${RandomActivities()}${Breweries()}`;
};

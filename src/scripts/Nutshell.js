import { LogOutButton } from "./auth/LogoutButton.js";
import { Chat } from "./Chat.js";
import { News } from "./news.js"
import {eventList} from "./Eventlists.js"
import { TaskForm } from "./TaskForm.js"
import { TaskList } from "./Tasks.js"
import { DadJokes } from "./DadJokes.js";
import { ChuckNorrisFacts } from "./ChuckNorris.js";
import { RandomActivities } from "./RandomActivity.js";

export const Nutshell = () => {
	return `${LogOutButton()}
	${Chat()}
    <div class="news">    
    ${News()}        
    </div>
    <div class="events">
    ${eventList()}
    </div>
    ${TaskForm()}
  ${TaskList()}
  ${ChuckNorrisFacts()}
  ${DadJokes()}
  ${RandomActivities()}
  `
};




  

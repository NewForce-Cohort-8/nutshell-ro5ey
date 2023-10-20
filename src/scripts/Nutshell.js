import { LogOutButton } from "./auth/LogoutButton.js";
import {eventList} from "./Eventlists.js"
import { eventForm, listOfEvents } from "./Events.js";


export const Nutshell = () => {
	return `${LogOutButton()}
	
    <div class="events">
    ${listOfEvents()}
    ${eventForm()}
    </div>
  `
};


  

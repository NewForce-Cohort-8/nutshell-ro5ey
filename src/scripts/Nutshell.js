import {LogOutButton} from "./auth/LogoutButton.js";
import { fetchEvents } from "./Dataaccess.js";
import { eventList } from "/Eventlists.js";
import { listOfEvents } from "./Events.js";
export const Nutshell = () => {

    LogOutButton();
    eventForm();
    listOfEvents();
      // Render all your UI components here
      fetchUsers()
      .then(() => fetchEvents())
      .then(() => {
        //render 
        Events();
      });


}



  

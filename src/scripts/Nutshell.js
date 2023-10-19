import {LogOutButton} from "./auth/LogoutButton.js";
import { fetchEvents } from "./dataAccess.js";
import { eventList } from "./Eventlists.js";
import { listOfEvents } from "./Events.js";
import { eventForm } from "./Events.js";
import { fetchUsers } from "./dataAccess.js";
//function is used to set up and render various UI components and data fetching operations for a web application
export const Nutshell = () => {

    LogOutButton();
    eventForm();
    listOfEvents();
      // Render all your UI components here
      fetchUsers()
      .then(() => fetchEvents())
      .then(() => {
        //render 
        //Events();
      });


}



  

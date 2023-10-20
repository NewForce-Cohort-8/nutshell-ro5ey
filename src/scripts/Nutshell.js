import { LogOutButton } from "./auth/LogoutButton.js"
import { getTasks } from "./dataAccess.js";   
import { TaskForm } from "./TaskForm.js"
import { TaskList } from "./Tasks.js"
import { Chat } from "./Chat.js";
import { News } from "./news.js";
import { DadJokes } from "./DadJokes.js";
import { ChuckNorrisFacts } from "./ChuckNorris.js";
import { RandomActivities } from "./RandomActivity.js";

export const Nutshell = () => {
  return `
  ${LogOutButton()}
  ${Chat()}
  <div class="news">    
  ${News()}        
  </div> 
  ${TaskForm()}
  ${TaskList()}
  ${ChuckNorrisFacts()}
  ${DadJokes()}
  ${RandomActivities()}
  `
};




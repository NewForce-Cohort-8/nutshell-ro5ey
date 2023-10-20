import { LogOutButton } from "./auth/LogoutButton.js"
import { getTasks } from "./dataAccess.js";   
import { TaskForm } from "./TaskForm.js"
import { TaskList } from "./Tasks.js"
import { Chat } from "./Chat.js";
import { News } from "./news.js"



export const Nutshell = () => {
  return `${LogOutButton()}
  ${Chat()}
  ${News()} 
  ${TaskForm()}
  ${TaskList()}`
};







      // Render all your UI components here
  


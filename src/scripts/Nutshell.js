import { LogOutButton } from "./auth/LogoutButton.js"
import { getTasks } from "./dataAccess.js";   
import { taskForm } from "./TaskForm.js"
import { Tasks } from "./Tasks.js"
import { Chat } from "./Chat.js";
import { fetchMessages, fetchUsers } from "./dataAccess.js";

export const Nutshell = () => {
  return `${LogOutButton()}
	${Chat()}  
  ${taskForm()}
  ${Tasks()}`
};



      // Render all your UI components here
  

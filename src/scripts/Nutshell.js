import { LogOutButton } from "./auth/LogoutButton.js"
import { getTasks } from "./dataAccess.js";   
import { TaskForm } from "./TaskForm.js"
import { TaskList } from "./Tasks.js"
import { Chat } from "./Chat.js";
import { fetchMessages, fetchUsers } from "./dataAccess.js";

export const Nutshell = () => {
  return `${LogOutButton()}
  ${Chat()}
  ${TaskForm()}
  ${TaskList()}`
};







      // Render all your UI components here
  

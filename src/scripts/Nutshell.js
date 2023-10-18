import { LogOutButton } from "./auth/LogoutButton.js"
import { getTasks } from "./dataAccess.js";   
import { taskForm } from "./TaskForm.js"
import { Tasks } from "./Tasks.js"

export const Nutshell = () => {
  
  LogOutButton()

  const nutshellHTML = `
  <div>
  ${taskForm()}
  ${Tasks()}
  
  </div>
  `

  return nutshellHTML


      // Render all your UI components here
  
}


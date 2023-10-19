import {LogOutButton} from "./auth/LogoutButton.js"
import { News } from "./news.js"
import { NewsForm } from "./newsForm.js"

const mainContainer = document.querySelector(".container")




export const Nutshell = () => {

    LogOutButton()
      // Render all your UI components here
  
  return `
  

    <div class="news">    
    ${News()}        
    </div>
  
  `
}


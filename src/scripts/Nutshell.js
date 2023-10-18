import {LogOutButton} from "./auth/LogoutButton.js"
import { News } from "./news.js"
import { NewsForm } from "./newsForm.js"

export const Nutshell = () => {

    LogOutButton()
      // Render all your UI components here
  
  return `
  <h2>News</h2>
    <section class="newsForm">    
    ${NewsForm()}        
    </section>

    <section class="news">    
    ${News()}        
    </section>
  
  `
}


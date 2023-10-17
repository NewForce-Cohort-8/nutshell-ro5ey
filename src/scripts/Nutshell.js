import {LogOutButton} from "./auth/LogoutButton.js"
import { News } from "./news.js"

export const Nutshell = () => {

    LogOutButton()
      // Render all your UI components here
  
  return `
    <section class="News">
    <h2>News</h2>
    ${News()}        
    </section>
  
  `
}


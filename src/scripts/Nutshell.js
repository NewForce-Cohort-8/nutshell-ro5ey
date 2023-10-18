import {LogOutButton} from "./auth/LogoutButton.js"
import { News } from "./news.js"
import { NewsForm } from "./newsForm.js"

const mainContainer = document.querySelector(".container")

mainContainer.addEventListener("click", clickEvent => {
  if (clickEvent.target.id === "newArticle") {
  console.log('click')
  mainContainer.innerHTML += NewsForm()
  }

})


export const Nutshell = () => {

    LogOutButton()
      // Render all your UI components here
  
  return `
  <h2>News</h2>
    <button class="button" id="newArticle">New Article</button>

    <section class="newsForm">    
          
    </section>

    <section class="news">    
    ${News()}        
    </section>
  
  `
}


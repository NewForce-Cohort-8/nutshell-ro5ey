import { sendArticle } from "./dataAccess.js"

const mainContainer = document.querySelector(".container")

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitArticle") {
        // Get what the user typed into the form fields
        const userTitle = document.querySelector("input[name='newsTitle']").value
        const userSynopsis = document.querySelector("input[name='newsSynopsis']").value
        const userUrl = document.querySelector("input[name='newsUrl']").value

        // Make an object out of the user input
        const dataToSendToAPI = {
            title: userTitle,
            synopsis: userSynopsis,
            url: userUrl,            
        }

        // Send the data to the API for permanent storage
        sendArticle(dataToSendToAPI)
    }
})

export const NewsForm = () => {
    let html = `
      <div class="field">
        <label class="label" for="newsTitle">Title</label>
        <input type="text" name="newsTitle" class=input />
      </div>
      <div class="field">
        <label class="label" for="newsSynopsis">Synopsis</label>
        <input type="text" name="newsSynopsis" class=input />
      </div>
      <div class="field">
        <label class="label" for="newsUrl">URL</label>
        <input type="text" name="newsUrl" class=input />
      </div>

      <button class="button" id="submitArticle">Submit Article</  button>
    `
    return html
}


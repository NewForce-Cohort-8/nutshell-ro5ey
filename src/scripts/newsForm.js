import { sendArticle } from "./dataAccess.js";

const mainContainer = document.querySelector(".container");

mainContainer.addEventListener("click", (clickEvent) => {
	if (clickEvent.target.id === "saveArticle") {
		// Get what the user typed into the form fields
		const userTitle = document.querySelector("input[name='newsTitle']").value;
		const userSynopsis = document.querySelector(
			"input[name='newsSynopsis']"
		).value;
		const userUrl = document.querySelector("input[name='newsUrl']").value;
		//add timestamp to article entry
		const userTimestamp = Date.now();

		// Make an object out of the user input
		const dataToSendToAPI = {
			title: userTitle,
			synopsis: userSynopsis,
			url: userUrl,
			timestamp: userTimestamp,
		};

		// Send the data to the API for permanent storage
		if (userTitle && userSynopsis && userUrl) {
			sendArticle(dataToSendToAPI);
		} else {
			window.alert("Please complete each field to save article");
		}
	}
});

export const NewsForm = () => {
	let html = `
    <div id="newsForm"
      
      <div class="field">
        <label class="label" for="newsTitle">Title</label>
        <input type="text" name="newsTitle" id="newsTitle" class=input required/>
      </div>
      <div class="field">
        <label class="label" for="newsSynopsis">Synopsis</label>
        <input type="text" name="newsSynopsis" id="newsSynopsis" class=input required/>
      </div>
      <div class="field">
        <label class="label" for="newsUrl">URL</label>
        <input type="text" name="newsUrl" id="newsUrl" class=input required/>
      </div>

      <button class="button" id="saveArticle">Save Article</  button>
    </section>
    `;
	return html;
};

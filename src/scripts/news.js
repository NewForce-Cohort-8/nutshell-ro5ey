import { deleteNewsArticle, getNews } from "./dataAccess.js";
import { NewsForm } from "./newsForm.js";

const mainContainer = document.querySelector(".container");

const convertArticleToListElement = (newsEntry) => {
	let html = `
    <div class="news">
    <li>
    ${newsEntry.title}
             <button class="news__delete"
                id="news--${newsEntry.id}">
            Delete
        </button>
    </li> 
    </div>   
`;

	return html;
};

export const News = () => {
	const news = getNews();
	let html = `
    <div class="newsForm" id="news">
    <h2>News</h2>
    <button class="button" id="newArticle">New Article</button>
    <ul>
        ${news.map(convertArticleToListElement).join("")}
    </ul>
    `;
	return html;
};

mainContainer.addEventListener("click", (click) => {
	if (click.target.id === "newArticle") {
		const news = document.querySelector("#news");
		console.log("click");
		news.innerHTML += NewsForm();
	}
	//news article delete button event listener
	if (click.target.id.startsWith("news--")) {
		const [, newsId] = click.target.id.split("--");
		deleteNewsArticle(parseInt(newsId));
	}
});

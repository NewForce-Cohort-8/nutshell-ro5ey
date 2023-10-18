import { deleteNewsArticle, getNews} from "./dataAccess.js";
import { NewsForm } from "./newsForm.js";

const mainContainer = document.querySelector(".container")


const convertArticleToListElement = (newsEntry) => 
{
    
    let html = `
    
    <li>
        Title:${newsEntry.title} 
    </li>
    
    <li>
        ${newsEntry.title}
        <button class="news__delete"
                id="news--${newsEntry.id}">
            Delete
        </button>
    </li>
`
    
    return html
}

export const News = () => {
    const news = getNews()
    let html = `
    <ul>
        ${
            news.map(convertArticleToListElement).join("")
        }
    </ul>
    `
    return html
}


//News article delete button event listener// 
mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("news--")) {
        const [,newsId] = click.target.id.split("--")
        deleteNewsArticle(parseInt(newsId))
    }
})
import { getNews } from "./dataAccess.js";

const mainContainer = document.querySelector(".container")


const convertRequestToListElement = (newsEntry) => 
{
    
    let html = `<li>
        Title:${newsEntry.title} 
    </li>
    
    <li>
        ${newsEntry.title}
        <button class="request__delete"
                id="request--${newsEntry.id}">
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
            news.map(convertRequestToListElement).join("")
        }
    </ul>
    `
    return html
}

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("news--")) {
        const [,newsId] = click.target.id.split("--")
        deleteNews(parseInt(newsId))
    }
})

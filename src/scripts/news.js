import { deleteNewsArticle, getNews} from "./dataAccess.js";
import { NewsForm } from "./newsForm.js";

const mainContainer = document.querySelector(".container")



const convertArticleToListElement = (newsEntry) => 
{
    
    let html = `
    
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
    <h2>News</h2>    

    <div class="newsForm">         
    </div>
    <button class="button" id="newArticle">New Article</button>
    <ul>
        ${
            news.map(convertArticleToListElement).join("")
        }
    </ul>
    `
    return html
}

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "newArticle") {
    console.log('click')
    mainContainer.innerHTML += NewsForm()
    }
  
  })

//News article delete button event listener// 
mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("news--")) {
        const [,newsId] = click.target.id.split("--")
        deleteNewsArticle(parseInt(newsId))
    }
})


const applicationState = {
    news: []
}

const mainContainer = document.querySelector(".container")

//fetching news data from the API and storing it in application state://

const API = "http://localhost:8088"

export const fetchNews = () => {
    return fetch(`${API}/news`)
        .then(response => response.json())
        .then(
            (newsArticles) => {               
                applicationState.news = newsArticles
            }
        )
}

//returns a copy of the news state//
export const getNews = () => {
    return applicationState.news.map(article => ({...article}))
}

export const sendArticle = (userNewsArticle) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userNewsArticle)
    }


    return fetch(`${API}/news`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomNewsEvent("stateChanged"))
        })
}

//Function whose responsiblity it is to initiate the fetch request for DELETE, the primary key sent to it as an argument.//

export const deleteNewsArticle = (id) => {
    return fetch(`${API}/news/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomNewsEvent("stateChanged"))
            }
        )
}
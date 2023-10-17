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
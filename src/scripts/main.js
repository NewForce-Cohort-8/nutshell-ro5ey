import { LoginForm } from "./auth/LoginForm.js"
import { RegisterForm } from "./auth/RegisterForm.js"
import { fetchNews } from "./dataAccess.js"
import { Nutshell } from "./Nutshell.js"


/*
    1. Check if the user is authenticated by looking in session storage for `activeUser`
    2. If so, render the Nutshell component
    3. If not, render the login and registration forms
    4. Also, if the user authenticates, and the login form is initially shown
        ensure that the Nutshell component gets rendered
*/


const activeUser = sessionStorage.getItem("activeUser")

if(!activeUser){
    LoginForm()
    RegisterForm()
} else {
    Nutshell()
}

const mainContainer = document.querySelector(".container")

// fetching the news data from the API and storing it in application state before we convert the data structures to HTML representations//
const render = () => {
    fetchNews().then(
        () => {
            mainContainer.innerHTML = Nutshell()
        }
    )
}

render()

//rerender page when state changes
mainContainer.addEventListener(
    "stateChanged",
    customNewsEvent => {
        render()
    }
)


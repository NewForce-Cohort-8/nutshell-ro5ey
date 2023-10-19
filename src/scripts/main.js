import { LoginForm } from "./auth/LoginForm.js"
import { Nutshell } from "./Nutshell.js"
import { RegisterForm } from "./auth/RegisterForm.js"
/*
    1. Check if the user is authenticated by looking in session storage for `activeUser`
    2. If so, render the Nutshell component
    3. If not, render the login and registration forms
    4. Also, if the user authenticates, and the login form is initially shown
        ensure that the Nutshell component gets rendered
*/

//checks the session storage to determine whether there is an active user. If there is no active user, it renders login and registration forms. If there is an active user, it initializes and displays the main application interface, indicating that the user is already logged in
const activeUser = sessionStorage.getItem("activeUser")

if(!activeUser){
    LoginForm()
    RegisterForm()
} else {
    Nutshell()
}

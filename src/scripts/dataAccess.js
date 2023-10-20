//this is to create and export an object that can be used to store the state of an application. ?The state object contains only one property, events, which is an empty array.

let applicationState = {
    events:[]
}
const API = "http://localhost:8088"
//selects an HTML element with the ID "dashboard" in the document and assigns a reference to that element to the JavaScript variable dashboard. This allows you to manipulate and interact with the selected HTML element in your JavaScript code using the dashboard variable.
const mainContainer = document.querySelector(".container")


//fetchs eventsfrom api - update the application's state with the fetched data, making it available for use in other parts of the application
export const fetchEvents = () => {
    return fetch(`${API}/events`)
        .then(response => response.json())
        .then(
            (newEvents) => {
                console.log(newEvents)

                applicationState.events = newEvents
            }
        )
}

//exports getevents - returns array of new objects with same data as events but seperate instances
export const getEvents = () => {
    return applicationState.events.map(event => ({ ...event}))
}

//brings users from api
export const fetchUsers = () => {
    return fetch(`${API}/users`)
        .then(response => response.json())
        .then(
            (data) => {
        
                applicationState.users = data
            }
        )
}

// ability to save event
export const saveEvent = (userEventRequest) => {
const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }, 
//a string that represents the contents of the userEventRequest object in JSON format
body: JSON.stringify(userEventRequest)}

//this code fetches data from a specified API endpoint, processes the response as JSON, and then triggers a custom event named "stateChanged" on the mainContainer element
return fetch(`${API}/events/${id}`, fetchOptions)
    .then(response => response.json())
    .then(() => {
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
    })
 }

// delete event capability
export const deleteEvent = () => {
    return fetch(`${API}/events/${id}`, { method: "DELETE" })
    .then(
        () => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        }
        )
    }
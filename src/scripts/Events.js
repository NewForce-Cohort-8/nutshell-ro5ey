import { getEvents, deleteEvent } from "/dataAccess.js";
//code sets up a reference to an HTML element with the id "dashboard" using the document.querySelector() method.
const mainContainer = document.querySelector(".container") //id //class . 

//targets elements with the id "createNewEvent." When such an element is clicked, it replaces the inner HTML content of an element with the id "new-event-form" with the HTML content generated by the eventForm function
mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "createNewEvent") {
        document.querySelector("#new-event-form").innerHTML = eventForm()
    }
})
//targets elements whose id starts with "delete-event--". When such an element is clicked, it extracts relevant data from the clicked element and then calls the deleteEvent function
mainContainer.addEventListener("click", clickEvent => {
    if(clickEvent.target.id.startsWith("delete-event--")){ 
        deleteEvent(parseInt(clickEvent.target.value))
    }
})
//listOfEvents function generates an HTML representation of a list of events. It uses event data obtained from the getEvents function and constructs a list of event containers, each with details such as name, date, location, and a "Delete" button. It also provides a "Create New Event" button and a placeholder for displaying a form to add new events
export const listOfEvents = (event) => {
    const events = getEvents()
    return `<div class="event-list">
    ${events.map(event => {
        return `<div class="event-container" id="${event.id}">
        <div class="event-name">${event.name}</div>
        <div class="event-date">${event.date}</div>
        <div class="event-location">${event.location}</div>
        <button class="even-delete-button" id="delete-event--${event.id}" value="${event.id}">Delete</button>
        </div>`
    }).join("")} 
     </div>
<div id="new-event-form"></div>
<button class="button" id="createNewEvent">Create New Event</button>
`
    }

    
    //calls eventForm() to get the HTML string representation of the form and then use this HTML in nutshell to display the create event form 
    export const eventForm = () => {
        let html = `
        <label class="label" for="event-name">Event</label>
        <input type="text" id="new-event-name" class="input"/>
        
        <label class="label" for="event-location">Location</label>
        <input type="text" id="new-event-location" class="input"/>
        
        <label class="label" for="event-date">Date</label>
        <input type="date" id="new-event-date" class="input">
        
        <button class="button" id="createEvent">Add a New Event</button>
        `
        return html
    }
    
    //handles event creation. It collects user input for a new event, validates that all required fields are filled out, and then creates and saves the event data when the user clicks the "createEvent" element. It also provides user feedback via a alert when required information is missing
    mainContainer.addEventListener("click", clickEvent => {
        if (clickEvent.target.id === "createEvent") {
            const eventName =  document.querySelector("input[id='new-event-name']").value
            const eventDate =  document.querySelector("input[id='new-event-date']").value
            const eventLocation = document.querySelector("input[id='new-event-location']").value
            
                    if(!eventName || !eventDate || !eventLocation){
                window.alert('Please enter a  event name, date, and location before saving')
            return
        }
        else{const newEventData = {
            name: eventName,
            date: eventDate,
            location: eventLocation
        }
        saveEvent(newEventData)
    }
    }
})
import { saveEvent } from "/dataAccess.js"
const mainContainer = document.querySelector("#container")
export const eventForm = () => {
    //template literals for for form which includes fields for event name, date, location, time, and description, along with a "Save Event" button and a background image container
    let html = `
   <h2>Add your Event</h2>
        <div class="field">
            <label class="label" for="eventName">Event Name</label>
            <input type="text" name="eventName" class="input" />
        </div>
        <div class="field">
            <label class="label" for="eventDate">Event Date</label>
            <input type="text" name="eventDate" class="input" />
        </div>
        <div class="field">
            <label class="label" for="eventLocation">Location</label>
            <input type="text" name="eventLocation" class="input" />
        </div>
        <div class="field">
            <label class="label" for="eventTime">Time</label>
            <input type="number" name="eventTime" class="input" />
        </div>
        <div class="field">
            <label class="label" for="eventDescription">Event Description</label>
            <input type="date" name="eventDescription" class="input" />
        </div>
           <button class="button" id="saveEvent" style="background-color: grey; font-family: Times New Roman">Save Event</button>
        <div class="bg-image"></div>
    `
    return html
}
//code listens for a click event on the mainContainer, checks if the "Save Event" button was clicked, collects user input data, prepares the data for sending to an API, and ensures that all required fields are filled out before initiating the data-saving process - console log inspects main container variable
console.log (mainContainer)
mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveEvent") {
        const userEvent = document.querySelector("input[name='eventName']").value
        const userDate = document.querySelector("input[name='eventDate']").value
        const userLocation = document.querySelector("input[name='eventLocation']").value
        const userTime = document.querySelector("input[name='eventTime']").value
        const  userDescription= document.querySelector("input[name='eventDescription']").value

        const dataToSendToAPI = {
            name: userEvent,
            eventDate:userDate,
            location: userLocation,
            eventTime: userTime,
            description: userDescription
        }
 if(userEvent && userDate && userLocation && userTime) {
        saveEvent(dataToSendToAPI)
        //mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
    }
    else {
        window.alert("Please finish all fields")
    }
}
})

//document.getElementById('eventForm').reportValidity();
//if (check) { //return true;
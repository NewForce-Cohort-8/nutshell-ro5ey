// Import functions that will pull data from the API and cache it locally
import { getEvents } from '/dataAccess.js'
// Import function to generate HTML for each event object
import { eventForm } from "./Events.js"

// Define array of month names to be used later in month partition header
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

// Build function to obtain API event data, generate HTML, and print to the DOM.
export const eventList = () => {
    // Define HTML target location for list of events
    const eventTarget = document.querySelector("#events")


    // Generate HTML using a string-template-literal function to generate an HTML card for each event
    eventTarget.innerHTML = `
        <section>
            <article class="flex-container-col">
                <div class="event-header flex-container-row-even">
                    <h5>Upcoming Events</h5>
                    <div class="button-container">
                        <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop" id="addEvent">+ Event</button>
                    </div>
                </div>
                <div class="scrollable-container-med">
                    <div class="flex-container-col" id="event-list">
                    
                    </div>
                </div>
            </article>
        </section>
        `;
    
    render()
    
}
//defines a function named render, selects an HTML element with the ID "event-list" to be the target for rendering content, and initializes an empty string in the eventsHTML variable to be used for storing HTML content that will be eventually displayed within the selected element
const render = () => {
    const eventListTarget = document.querySelector("#event-list")
    let eventsHTML = ""

    // Fetch events, cache events locally
    getEvents().then(() => {
        let events = useEvents();
        let months = []
        //generates HTML content based on the events in the events array. If there are no events, it displays a "No Upcoming Events" message. If there are events, it calculates the month of the first event and initializes a count of events in that month
        if (events.length === 0) {
            eventsHTML += `
            <div class="">
                <h6>No Upcoming Events</h6>
            </div>
            `
        } else {
            let month = new Date(+events[0].eventDate).toDateString("en-US").split(" ")[1]
            let numEventsInMonth = 1;

            eventsHTML += `
            <h6>${monthNames.find(mon => mon.includes(month))} <span class="badge rounded-pill bg-secondary" id="numEvents-${month}"></span></h6>
            ${eventCard(events[0], borderClass[0], textClass[0], backgroundClass[0])}
            `
            // for organizing events by month and counting the number of events in each month.
            for (let i=1; i<events.length; i++) {
                
                if (new Date(+events[i].eventDate).toDateString("en-US").split(" ")[1] !== month) {
                    months.push({monthName: month, numEvents: numEventsInMonth})

                    numEventsInMonth = 0;

                    month = new Date(+events[i].eventDate).toDateString("en-US").split(" ")[1]

                    eventsHTML += `<h6>${monthNames.find(mon => mon.includes(month))} <span class="badge rounded-pill bg-secondary" id="numEvents-${month}"></span></h6>`
                }
                //used within a loop to process events one by one. It updates the eventsHTML string to include an event card for each event. It also increments numEventsInMonth to count the number of events in the current month. When the loop reaches the last event, it records the total number of events for that month in the months array
                eventsHTML += eventCard(events[i], borderClass[1], textClass[1], backgroundClass[1])

                numEventsInMonth++

                if (i === events.length - 1) {
                        months.push({monthName: month, numEvents: numEventsInMonth})
                }
            }            
        }
        // responsible for injecting the HTML content of events into a specified element on the web page and updating the number of events displayed for each month based on the information stored in the months array
        eventListTarget.innerHTML = eventsHTML

        months.forEach(month => document.querySelector(`#numEvents-${month.monthName}`).innerHTML = month.numEvents)
    })
}
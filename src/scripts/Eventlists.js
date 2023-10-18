// Import functions that will pull data from the API and cache it locally
import { deleteEvent, getEvents } from '/dataAccess.js'
// Import function to generate HTML for each event object
import { eventForm } from './Events.js'

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

const render = () => {
    const eventListTarget = document.querySelector("#event-list")
    let eventsHTML = ""

    // Fetch events, cache events locally
    getEvents().then(() => {
        let events = useEvents();
        let months = []

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
            
            for (let i=1; i<events.length; i++) {
                
                if (new Date(+events[i].eventDate).toDateString("en-US").split(" ")[1] !== month) {
                    months.push({monthName: month, numEvents: numEventsInMonth})

                    numEventsInMonth = 0;

                    month = new Date(+events[i].eventDate).toDateString("en-US").split(" ")[1]

                    eventsHTML += `<h6>${monthNames.find(mon => mon.includes(month))} <span class="badge rounded-pill bg-secondary" id="numEvents-${month}"></span></h6>`
                }
                
                eventsHTML += eventCard(events[i], borderClass[1], textClass[1], backgroundClass[1])

                numEventsInMonth++

                if (i === events.length - 1) {
                        months.push({monthName: month, numEvents: numEventsInMonth})
                }
            }            
        }

        eventListTarget.innerHTML = eventsHTML

        months.forEach(month => document.querySelector(`#numEvents-${month.monthName}`).innerHTML = month.numEvents)
    })
}
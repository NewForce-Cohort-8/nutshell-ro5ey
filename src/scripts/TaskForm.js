import {sendTasks} from "./dataAccess.js"



const mainContainer = document.querySelector(".container")
const userId = sessionStorage.getItem("activeUser");


export const TaskForm = () => {
    let html = `
    <div class = "taskForm">
    <h1>Add New Task</h1>
        <button class= "button" id ="submitTask">Add New Task</button>

        <form id="myForm" style="display: none;">
        <br>
            <label class "label" for="taskName">Enter New Task:</label>
            <input type="text" name="taskName" class = "input"/><br> 
            <label class "label" for="goalDate">Goal Date:</label>
            <input type="date" name="goalDate" class ="input"/><br>
            <label class "label" for="completionDate">Completion Date:</label>
            <input type="date" name="completionDate" class = "input"/><br>
            <br>
            <input type="submit" id= "newTask" value="Submit">
        </form>
    </div>
    `

    return html
}

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitTask") {
        const form = document.getElementById("myForm")
        if (form.style.display === 'none') {
            // 👇 this SHOWS the form
            form.style.display = 'block';
         }else {
            // 👇 this HIDES the form
            form.style.display = 'none';
            
          }
    }
})

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "newTask") {
        // Get what the user typed into the form fields
        const newInputTask = document.querySelector("input[name='taskName']").value
        const goalDate = document.querySelector("input[name='goalDate']").value
        const completionDate = document.querySelector("input[name='completionDate']").value

        // Make an object out of the user input
        const dataToSendToAPI = {
            userId: userId,
            task: newInputTask,
            goalDate: goalDate,
            completionDate: completionDate,
            complete: false
        }

        // Send the data to the API for permanent storage
        sendTasks(dataToSendToAPI)
    }

})



// export const taskForm = () => {
//     return `<button id="addTaskButton">Add New Task</button>`
// }

// export const showTaskForm = () => {
// return `
// <div id="taskForm">
// <h2>Add a New Task</h2>
// <label for="taskName">Task Name:</label>
// <input type="text" name="taskName" id="taskName"/>
// <label for="completionDate">Expected Completion Date:</label>
// <input type="date" name="completionDate" id="completionDate"/>
// <label for="goalDate">Expected Goal Date:</label>
// <input type="date" name="goalDate" id="goalDate"/>
// <label for="completed">Completed:</label>
// <input type="checkbox" name="completed" id="completed"/>
// <button type="submit">Add Task</button>   
// </div>`
// }
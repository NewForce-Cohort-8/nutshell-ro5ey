import { Tasks } from "./Tasks.js"; 
import { getTasks } from "./dataAccess.js"

export const taskForm = () => {
    let html = `
    <button id="addTaskButton">Add New Task</button>
    <div id="taskForm" style="display: none;">
    <h2>Add a New Task</h2>
    <form id="newTaskForm">
        <label for="taskName">Task Name:</label>
        <input type="text" id="taskName"><br><br>
        <label for="completionDate">Expected Completion Date:</label>
        <input type="date" id="completionDate"><br><br>
        <label for="goalDate">Expected Goal Date:</label>
        <input type="date" id="goalDate"><br><br>
        <button type="submit">Add Task</button>   
    </form>
    
</div>`

return html 
}
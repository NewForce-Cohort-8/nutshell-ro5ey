import { getTasks } from "./dataAccess.js"; 
import { taskForm } from "./TaskForm.js";

const taskFormElement = document.getElementById('taskForm');
const newTaskForm = document.getElementById('newTaskForm');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

const populateTaskForm = () => {
    const tasks = getTasks()
    let html = ""
    tasks.map((task) => {
        html += `
        <button class="tasks__delete"
                id="task--${task.id}">
            Delete
        </button>
`
    })
  return html 
};

// Show the task form when the "Add New Task" button is clicked
addTaskButton.addEventListener('click', () => {
    taskFormElement.style.display = 'block';
    });

// 
const tasksHTML = populateTaskForm()
// 
export const Tasks = () => {

let html = `
        ${tasksHTML}
    `;
    return html;

}
    
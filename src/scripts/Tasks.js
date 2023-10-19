import { getTasks, deleteTasks } from "./dataAccess.js";


const mainContainer = document.querySelector(".container")

const taskFormElement = document.getElementById('taskForm');
const newTaskForm = document.getElementById('newTaskForm');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

export const TaskList = ()=>{
    const tasks= getTasks()
    
    let html = '<h1>Task List</h1>'
    html+= '<ul>'
       
    const convertTaskToListElement= tasks.map((task)=>{
        
                return `
                <div id="incomplete">
                    <li>${task.task} by ${task.goalDate} 
                    <input type="checkbox" id="task--${task.id}" >
                   
                    </li>
                </div>`
            
            
        }
    )  

    html += convertTaskToListElement.join("")
    html+= '</ul>'
    
    return html    
    
    }

    mainContainer.addEventListener("change", function(event) {
        if (event.target.id.startsWith("task--")){
            
            if(event.target.checked){
                const [,taskId] = event.target.id.split("--")
                deleteTasks(parseInt(taskId))
            }
        } 
    })



//const populateTaskForm = () => {
//     const tasks = getTasks()
//     let html = ""
//     tasks.map((task) => {
//         html += `
//         <button class="tasks__delete"
//                 id="task--${task.id}">
//             Delete
//         </button>
// `
//     })
//     return html
// };

// // Show the task form when the "Add New Task" button is clicked
// document.addEventListener('click', (e) => {
//     if (e.target.id === "addTaskButton") {
//         console.log("Click add form button")
//         const showme = showTaskForm()
//         console.log(showme)
//         document.querySelector("#showTaskForm").innerHTML = showme
//         // taskFormElement.style.display = 'block'; 
//     }
// });



// // 
// const tasksHTML = populateTaskForm()
// // 
// export const Tasks = () => {

//     let html = `
//         ${tasksHTML}
//     `;
//     return html;

// }

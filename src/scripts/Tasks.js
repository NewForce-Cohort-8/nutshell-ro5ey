import { getTasks, deleteTask, sendTasks } from "./dataAccess.js";

const mainContainer = document.querySelector(".container");
const userId = sessionStorage.getItem("activeUser");

const TaskForm = () => {
	let html = `
    <div class = "taskForm">
    <h1>Add New Task</h1>
        <button class= "button" id ="submitTask">Add New Task</button>

        <form id="myForm">
        <br>
            <label class="label" for="taskName">Task:</label>
            <input type="text" id="taskName" name="taskName" class = "input" placeholder="Enter new task..."/>
            <label class="label" for="goalDate">Goal Date:</label>
            <input type="date" id="goalDate" name="goalDate" class ="input"/>
            <input type="submit" id="newTask" value="Submit" />
        </form>
    </div>
    `;

	return html;
};

const convertTasks = () => {
	const tasks = getTasks();
	console.log(tasks);
	let TableBodyHTML = tasks
		.map((task) => {
			return `
    <tbody id="incomplete-tasks" class="incomplete-body">
    <tr class="task">
                <td class="complete-checkbox"><input type="checkbox" id="complete-task--${task.id}" /></td>
                <td class="goal-date">${task.goalDate} </td>
                <td class="task-name">${task.task}</td> 
                <td class="delete-checkbox"><input type="checkbox" id="delete-task--${task.id}" /></td>
            </tr>
            </tbody>
            `;
		})
		.join("");
	return TableBodyHTML;
};

export const TaskList = () => {
	let html = `<h2>To Do List</h2>${TaskForm()}
        <table id="task-list">
        <thead id="task-list-header" class="table-header">
        <tr class="table-header-row">
        <th id="complete-header" class="table-header checkbox">Complete</th>
        <th id="-goal-date-header" class="table-header date">Goal Date</th>
        <th id="name-header" class="table-header name">Task</th>
        <th id="delete-header" class="table-header checkbox">Delete</th>
        </tr>
    </thead>
    ${convertTasks()}
    </table>`;

	return html;
};

mainContainer.addEventListener("change", (event) => {
	if (event.target.id.startsWith("delete-task")) {
		const [, taskId] = event.target.id.split("--");
		if (event.target.checked) {
			deleteTask(parseInt(taskId));
		}
	}
});

mainContainer.addEventListener("click", (event) => {
	if (event.target.id === "newTask") {
		const currentUserId = userId;
		// Get what the user typed into the form fields
		const newInputTask = document.querySelector("input[name='taskName']").value;
		const userGoalDate = document.querySelector("input[name='goalDate']").value;
		console.log(newInputTask);
		console.log(goalDate);
		// Make an object out of the user input
		const taskToSendToAPI = {
			userId: currentUserId,
			task: newInputTask,
			goalDate: userGoalDate,
			completed: false,
		};

		// Send the data to the API for permanent storage
		console.log(taskToSendToAPI);
		sendTasks(taskToSendToAPI);
	}

	// if (clickEvent.target.id === "submitTask") {
	// 	const form = document.getElementById("myForm");
	// 	if (form.style.display === "none") {
	// 		// 👇 this SHOWS the form
	// 		form.style.display = "block";
	// 	} else {
	// 		// 👇 this HIDES the form
	// 		form.style.display = "none";
	// 	}
	// }
});

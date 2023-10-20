import { getTasks, deleteTask, sendTasks, updateTask } from "./dataAccess.js";

const mainContainer = document.querySelector(".container");
const userId = sessionStorage.getItem("activeUser");

const TaskForm = () => {
	let html = `
    <div class = "taskForm">
        <button class= "button" id="submitTask"">Add New Task</button>
        <form id="myForm" style="display: none">
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

const convertCompletedTasks = () => {
	const tasks = getTasks();
	const completedTasks = tasks.filter((task) => task.completed);
	console.log(completedTasks);
	const sortedCompletedTasks = completedTasks.sort((a, b) => {
		return a.completedDate - b.completedDate;
	});
	let TableBodyHTML = sortedCompletedTasks
		.map((task) => {
			return `   
                    <tbody id="complete-tasks" class="complete-body">
                        <tr class="task">
                            <td class="goal-date">${new Date(
															task.completedDate
														).toLocaleDateString("en-US")}</td>
                            <td class="task-name">${task.task}</td> 
                            <td class="delete-checkbox"><input type="checkbox" id="delete-task--${
															task.id
														}" /></td>
                        </tr>
                    </tbody>
                `;
		})
		.join("");
	return TableBodyHTML;
};

const convertIncompleteTasks = () => {
	const tasks = getTasks();
	const sortedTasks = tasks.sort((a, b) => {
		return new Date(a.goalDate) - new Date(b.goalDate);
	});
	console.log(tasks);
	let TableBodyHTML = sortedTasks
		.map((task) => {
			if (!task.completed) {
				return `
                    <tbody id="incomplete-tasks" class="incomplete-body">
                        <tr class="task">
                            <td class="complete-checkbox"><input type="checkbox" id="complete-task--${
															task.id
														}" /></td>
                            <td class="goal-date">${new Date(
															task.goalDate
														).toLocaleDateString("en-US")} </td>
                            <td class="task-name">${task.task}</td> 
                            <td class="delete-checkbox"><input type="checkbox" id="delete-task--${
															task.id
														}" /></td>
                        </tr>
                    </tbody>
                `;
			}
		})
		.join("");
	return TableBodyHTML;
};

export const TaskList = () => {
	let html = `<h2>To Do List</h2>${TaskForm()}
        <table id="incomplete-task-list">
        <thead id="incomplete-task-list-header" class="table-header">
        <tr class="table-header-row">
        <th class="table-header checkbox complete-header">Complete</th>
        <th class="table-header date goal-date-header">Goal Date</th>
        <th class="table-header name name-header">Task</th>
        <th class="table-header checkbox delete-header">Delete</th>
        </tr>
    </thead>
    ${convertIncompleteTasks()}
    </table>
    <h2>Completed Tasks</h2>
        <table id="completed-task-list">
        <thead id="complete-task-list-header" class="table-header">
        <tr class="table-header-row">
        <th class="table-header date complete-date-header">Date Completed</th>
        <th class="table-header name name-header">Task</th>
        <th class="table-header checkbox delete-header">Delete</th>
        </tr>
    </thead>
    ${convertCompletedTasks()}
    </table>`;

	return html;
};

mainContainer.addEventListener("change", (event) => {
	const [, taskId] = event.target.id.split("--");
	if (event.target.id.startsWith("delete-task") && event.target.checked) {
		deleteTask(parseInt(taskId));
	}
	if (event.target.id.startsWith("complete-task") && event.target.checked) {
		const userTask = {
			completed: true,
			completedDate: Date.now(),
		};
		updateTask(userTask, parseInt(taskId));
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
			goalDate: new Date(userGoalDate).getTime(),
			completed: false,
		};

		// Send the data to the API for permanent storage
		console.log(taskToSendToAPI);
		sendTasks(taskToSendToAPI);
	}

	if (event.target.id === "submitTask") {
		const form = document.getElementById("myForm");
		if (form.style.display === "none") {
			// 👇 this SHOWS the form
			form.style.display = "block";
		} else {
			// 👇 this HIDES the form
			form.style.display = "none";
		}
	}
});

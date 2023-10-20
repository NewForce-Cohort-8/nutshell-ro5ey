import { sendTasks } from "./dataAccess.js";

const mainContainer = document.querySelector(".container");
const userId = sessionStorage.getItem("activeUser");

export const TaskForm = () => {
	let html = `
    <div class = "taskForm">
    <h1>Add New Task</h1>
        <button class= "button" id ="submitTask">Add New Task ${userId}</button>

        <form id="myForm">
        <br>
            <label class="label" for="taskName">Enter New Task:</label>
            <input type="text" id="taskName" name="taskName" class = "input"/>
            <label class="label" for="goalDate">Goal Date:</label>
            <input type="date" id="goalDate" name="goalDate" class ="input"/>
            <input type="submit" id="newTask" value="Submit">
        </form>
    </div>
    `;

	return html;
};

mainContainer.addEventListener("click", (clickEvent) => {
	if (clickEvent.target.id === "newTask") {
		const currentUserId = userId;
		// Get what the user typed into the form fields
		const newInputTask = document.querySelector("input[name='taskName']").value;
		const userGoalDate = document.querySelector("input[name='goalDate']").value;
		console.log(Date.now());
		console.log(newInputTask);
		console.log(goalDate);
		// Make an object out of the user input
		const taskToSendToAPI = {
			userId: currentUserId,
			task: newInputTask,
			dateCreated: Date.now(),
			goalDate: userGoalDate.getTime(),
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

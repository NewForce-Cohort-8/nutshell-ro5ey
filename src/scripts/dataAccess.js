const applicationState = {
    tasks: [],
}

const mainContainer = document.querySelector("#container")
const API = "http://localhost:8088"

export const fetchTasks = () => {
    return fetch(`${API}/tasks`)
    .then((response) => response.json())
    .then((tasks) => {
        applicationState.tasks = tasks;
    })
};
export const getTasks = () => {
    return applicationState.tasks.map(task => ({...task}))
};
export const deleteTasks = (id) => {
    return fetch(`${API}/tasks/${id}`, {
        method: "DELETE", 
    }).then(() => {
        mainContainer.dispatchEvent(new CustomEvent ("stateChanged"));
    })
};


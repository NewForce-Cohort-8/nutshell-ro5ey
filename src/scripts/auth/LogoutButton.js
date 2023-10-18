const mainContainer = document.querySelector(".container");

export const LogOutButton = () => {
	return `<button id="logout-button">Log Out</button>`;
};

document.addEventListener("click", (eventObject) => {
	if (eventObject.target.id === "logout-button") {
		// clear session storage
		sessionStorage.clear();
		//dispatch changed state
		mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
	}
});

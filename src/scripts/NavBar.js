import { LogOutButton } from "./auth/LogoutButton.js";

export const NavBar = () => {
	let navBarHTML = `
    <div class="row" id="logo">
    <img src="./assets/cropped-Free Acorn Vector-1697779545718.svg" id="logo-img">
    <h1 id="title">Nutshell</h1>
    </div>
    <nav class="nav">
        <ol class="row" id="nav-bar">
            <li class="nav-item" id="nav--friends">Friends</li>
            <li class="nav-item" id="nav--chats">Chats</li>
            <li class="nav-item" id="nav--images">Images</li>
            <li class="nav-item" id="nav--events">Events</li>
            <li class="nav-item" id="nav--news">News</li>
            <li class="nav-item" id="nav--tasks">Tasks</li>
            <li class="nav-item">${LogOutButton()}</li>
        </ol>
    </nav>
    `;
	return navBarHTML;
};

const updateNavBar = (id, event) => {
	sessionStorage.setItem(``);
};
const mainContainer = document.querySelector(".container");
mainContainer.addEventListener("click", (event) => {
	if (event.target.id.startsWith("nav--")) {
		const [, navId] = event.target.id.split("--");
		const matchingComponent = document.querySelector(`#dashboard--${navId}`);
		const isActive = event.target.classList.contains("active");
		if (isActive) {
			event.target.classList.remove("active");
			matchingComponent.classList.add("hidden");
			sessionStorage.removeItem(navId);
		} else {
			event.target.classList.add("active");
			matchingComponent.classList.remove("hidden");
			sessionStorage.setItem("navClicked", true);
			sessionStorage.setItem(navId, true);
		}
		if (sessionStorage.getItem("navClicked") === "true") {
			const splashPage = document.querySelector("#splash-page");
			if (splashPage) {
				splashPage.classList.add("hidden");
			}
		}
	}
});

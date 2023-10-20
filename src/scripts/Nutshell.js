import { NavBar } from "./NavBar.js";
import { SplashPage } from "./SplashPage.js";
import { Dashboard } from "./Dashboard.js";

export const Nutshell = () => {
	let navWasClicked = sessionStorage.getItem("navClicked");
	let html = `
  ${NavBar()}
  `;
	if (navWasClicked !== "true") {
		html += `${SplashPage()}${Dashboard()}`;
	} else {
		html += `${Dashboard()}
    `;
	}
	return html;
};

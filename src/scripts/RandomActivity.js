const activityAPI = `https://www.boredapi.com/api/activity/`;

let randomActivity = {};

export const fetchRandomActivity = () => {
	return fetch(`${activityAPI}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
		},
	})
		.then((response) => response.json())
		.then((activity) => {
			randomActivity = activity.activity;
		});
};

const activityWrapper = (activity) => {
	return `<article id="random-activities"><h2>Random Activities</h2><div id="activity-wrapper">${activity}</div><button class="new-button" id="new-activity">NEW ACTIVITY</button></article>`;
};
export const RandomActivities = () => {
	return activityWrapper(randomActivity);
};

document.addEventListener("click", (event) => {
	if (event.target.id === "new-activity") {
		let newActivity = document.querySelector("#activity-wrapper");
		fetchRandomActivity().then(() => {
			newActivity.innerHTML = randomActivity;
		});
	}
});

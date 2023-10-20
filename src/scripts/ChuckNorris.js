const chuckAPI = `https://api.chucknorris.io/jokes/random`;

let chuckFact = {};

export const fetchChuckFact = () => {
	return fetch(`${chuckAPI}`)
		.then((response) => response.json())
		.then((fact) => {
			chuckFact = fact.value;
		});
};

const factWrapper = (fact) => {
	return `<article id="chuck-facts"><h2>Chuck Norris Facts</h2><div id="chuck-norris-wrapper">${fact}</div><button class="new-button" id="new-chuck-fact">NEW FACT</button></article>`;
};
export const ChuckNorrisFacts = () => {
	return factWrapper(chuckFact);
};

document.addEventListener("click", (event) => {
	if (event.target.id === "new-chuck-fact") {
		let newChuckFact = document.querySelector("#chuck-norris-wrapper");
		fetchChuckFact().then(() => {
			newChuckFact.innerHTML = chuckFact;
		});
	}
});

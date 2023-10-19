const dadJokeAPI = `https://icanhazdadjoke.com/`;

let dadJoke = {};

export const fetchDadJoke = () => {
	return fetch(`${dadJokeAPI}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
		},
	})
		.then((response) => response.json())
		.then((joke) => {
			dadJoke = joke.joke;
		});
};

const jokeWrapper = (joke) => {
	return `<article id="dad-jokes"><h2>Dad Joke</h2><div id="dad-joke-wrapper">${joke}</div><button class="new-button" id="new-dad-joke">NEW DAD JOKE</button></article>`;
};
export const DadJokes = () => {
	return jokeWrapper(dadJoke);
};

document.addEventListener("click", (event) => {
	if (event.target.id === "new-dad-joke") {
		let newDadJoke = document.querySelector("#dad-joke-wrapper");
		fetchDadJoke().then(() => {
			newDadJoke.innerHTML = dadJoke;
		});
	}
});

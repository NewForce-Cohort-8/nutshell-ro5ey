let currentJoke;
export const DadJokes = () => {
	let html = "";
	const fetchDadJoke = () => {
		const url = "https://dad-jokes.p.rapidapi.com/random/joke";
		const options = {
			method: "GET",
			headers: {
				"X-RapidAPI-Key": "cdf9e19d97msh4c01a1cec7b4d83p1fce09jsne3a1260463d4",
				"X-RapidAPI-Host": "dad-jokes.p.rapidapi.com",
			},
		};

		fetch(url, options)
			.then((response) => response.json())
			.then((joke) => {
				currentJoke = joke.body[0];
				console.log(currentJoke);
				console.log(currentJoke.setup);
				console.log(currentJoke.punchline);
			});
	};

	fetchDadJoke();
};

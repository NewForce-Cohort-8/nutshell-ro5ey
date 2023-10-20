const breweryAPI = `https://api.openbrewerydb.org/v1/breweries?`;

let breweries = {};
let searchBy = `by_state=`;
let currentSearchParam = `west_virginia`;
export const fetchBreweries = () => {
	return fetch(`${breweryAPI}${searchBy}${currentSearchParam}`)
		.then((response) => response.json())
		.then((theseBreweries) => {
			breweries = theseBreweries;
		});
};

const convertSearchParam = () => {
	let splitParam = currentSearchParam.split("_");
	for (let i = 0; i < splitParam.length; i++) {
		splitParam[i] =
			splitParam[i].charAt(0).toUpperCase() + splitParam[i].slice(1);
	}
	return splitParam.join(" ");
};

const makeBreweriesList = (arr) => {
	let breweryHTML = `
	<div id="brewery-component" class="column">
	<div class="column brewery-header">
    <h2>Breweries</h2>
	<div 
	class="row">
	<div class="column" id="brewery-inputs">
	<div class="row input-row">
    <label for="search-by-city">Search by city:</label>
    <input type="text" name="search-by-city" id="search-by-city" placeholder="Enter city..." />
	</div>
	<div class="row">
    <label for="search-by-state">Search by state:</label>
    <input type="text" name="search-by-state" id="search-by-state" placeholder="Enter state..." />
	</div>
	</div>
    <button id="brewery-search">SEARCH</button>
	</div>
    <h3 class="breweries-param">Currently showing breweries in: ${convertSearchParam()}</h3>
	</div>
	<div class="row" id="brewery-container">
    `;
	breweryHTML += arr
		.map((brewery) => {
			let html = `
			
			<div class="brewery-card column">
        <h3 class="brewery-name">${brewery.name}</h3>
        `;
			if (brewery.street) {
				html += `<div class="brewery-street row"><h4 class="street-header">Street:</h4>${brewery.street}</div>`;
			}
			html += `
            <div class="brewery-city row"><h4 class="city-header">City:</h4>${brewery.city}</div>
            <div class="brewery-state row"><h4 class="state-header">State:</h4>${brewery.state}</div>
        <div class="row brewery-phone"><h4 class="phone-header">Phone:</h4>${brewery.phone}</div>`;
			if (brewery.website_url) {
				html += `<div class="brewery-website row"><a href="${brewery.website_url}">website</a></div>`;
			}
			html += `</div>`;
			return html;
		})
		.join("");
	breweryHTML += `</div></div>`;
	return breweryHTML;
};
export const Breweries = () => {
	return `
    <article id="breweries">
    <section id="breweries-wrapper">${makeBreweriesList(breweries)}</section>
    </article>
    `;
};

const convertSearchInput = (value) => {
	let valueArr = value.split(" ");
	for (let i = 0; i < valueArr.length; i++) {
		valueArr[i] = valueArr[i].charAt(0).toLowerCase() + valueArr[i].slice(1);
	}
	return valueArr.join("_");
};

document.addEventListener("click", (event) => {
	if (event.target.id === "brewery-search") {
		const city = document.querySelector('input[name="search-by-city"]').value;
		const state = document.querySelector('input[name="search-by-state"]').value;
		const breweriesWrapper = document.querySelector("#breweries-wrapper");
		console.log(city);
		console.log(state);
		if (city) {
			searchBy = "by_city=";
			currentSearchParam = convertSearchInput(city);
			fetchBreweries().then(() => {
				breweriesWrapper.innerHTML = makeBreweriesList(breweries);
			});
		}
		if (state && !city) {
			searchBy = "by_state=";
			currentSearchParam = convertSearchInput(state);
			fetchBreweries().then(() => {
				breweriesWrapper.innerHTML = makeBreweriesList(breweries);
			});
		}
	}
});

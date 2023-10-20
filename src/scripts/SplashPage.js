import { Breweries } from "./Breweries.js";
import { ChuckNorrisFacts } from "./ChuckNorris.js";
import { DadJokes } from "./DadJokes.js";
import { RandomActivities } from "./RandomActivity.js";

export const SplashPage = () => {
	return `
    <div id="splash-page" class="row splash-container">
    <div class="column splash-container" id="splash-breweries">
    ${Breweries()}
    </div>
    <div class="column splash-container" id="other-splash-items">
    ${ChuckNorrisFacts()}
    ${DadJokes()}
    ${RandomActivities()}
    </div>
    </div>
    `;
};

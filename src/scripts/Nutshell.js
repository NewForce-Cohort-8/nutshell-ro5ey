import { LogOutButton } from "./auth/LogoutButton.js";
import { Chat } from "./Chat.js";
import { News } from "./news.js"



export const Nutshell = () => {
	return `${LogOutButton()}
	${Chat()}<div class="news">    
    ${News()}        
    </div>`;
};


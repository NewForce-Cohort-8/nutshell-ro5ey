import { Chat } from "./Chat.js";
import { News } from "./news.js";
import { TaskList } from "./Tasks.js";

export const Dashboard = () => {
	let html = `
    <div class="row dashboard-component" id="my-dashboard">
    <div class="column dashboard-container hidden" id="dashboard--chats">
    ${Chat()}
    </div> 
    <div class="column dashboard-container hidden" id="dashboard--news">
    ${News()}
    </div> 
    <div class="column dashboard-container hidden" id="dashboard--tasks">
    ${TaskList()}
    </div> 
    <div class="column dashboard-container hidden" id="dashboard--events">
    </div> 
    <div class="column dashboard-container hidden" id="dashboard--images">
    </div> 
    <div class="column dashboard-container hidden" id="dashboard--friends">
    </div> 
    </div>
    `;
	return html;
};

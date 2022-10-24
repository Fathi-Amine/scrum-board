// Element selection
const saveBtn = document.querySelector('#save-form');
const titleInput = document.querySelector('#recipient-name');
const radioBtns = document.querySelectorAll('#radio-type');
const priorityOptions = document.querySelector('#priority-select');
const statusOptions = document.querySelector('#status-select');
const dateInput = document.querySelector('#date-calender');
const textArea = document.querySelector('#message-text');
const form = document.querySelector('#mod-form');
const editBtn = document.querySelector('#editBtn');
const deleteBtn = document.querySelector('#deleteBtn');
const todoColumn = document.querySelector('#to-do-tasks');
const inProgressColumn = document.querySelector('#in-progress-tasks');
const doneColumn = document.querySelector('#done-tasks');
let toDoCounter = document.getElementById('to-do-tasks-count');
let inProgressCounter = document.getElementById('in-progress-tasks-count');
let doneCounter = document.getElementById('done-tasks-count');
let ind;
let c1 = 0;
let c2 = 0;
let c3 = 0;

const tasks = [
	{
		title: "Keep all the updated requirements in one place",
		date: "2022-10-08",
		priority: "High",
		type: "feature",
		status: "To do",
		description: "There is hardly anything more frustrating than having to look for current requirements in tens of comments under the actual description or having to decide which commenter is actually authorized to change the requirements. The goal here is to keep all the up-to-date requirements and details in the main/primary description of a task. Even though the information in comments may affect initial criteria, just update this primary description accordingly."
	},
	{
		title: "Consider creating an acceptance criteria list",
		date: "2022-10-08",
		priority: "High",
		type: "feature",
		status: "To do",
		description: `Descriptive requirements are very helpful when it comes to understanding the context of a problem, yet finally it is good to precisely specify what is expected. Thus the developer will not have to look for the actual requirements in a long, descriptive text but he will be able to easily get to the essence. One might find that sometimes — when acceptance criteria are well defined — there is little or no need for any additional information. Example:
		a) User navigates to “/accounts” and clicks on red download CSV button
		b) Popup appears with two buttons: “This year” and “Last year”
		c) If user clicked on “Last year” download is initiated
		d) CSV downloaded includes following columns…`
	},
	{
		title: "Provide examples, credentials, etc",
		date: "2022-10-08",
		priority: "High",
		type: "feature",
		status: "To do",
		description: "If the expectation is to process or generate some file — attach an example of such a file. If the goal is to integrate what is being developed with some service, ensure your devs have access to this service and its documentation. This list could go on and on — the bottom line is — if there is something that our developer might make use of, try to foresee it and provide them with (access to) it."
	},
	{
		title: "Annotate",
		date: "2022-10-08",
		priority: "High",
		type: "feature",
		status: "To do",
		description: "The mockup provided can sometimes be confusing for developers. Especially if it contains much more content than the scope of the task described. Drop a couple of arrows, outlines and annotations here and there to emphasize what are the important parts of the mockup from the task requirements perspective."
	},
	{
		title: "Use charts and diagrams",
		date: "2022-10-08",
		priority: "High",
		type: "feature",
		status: "To do",
		description: "While it is not always necessary, sometimes it might be beneficial to prepare a flowchart, a block diagram or some other kind of concept visualization that will render it easy for the developer to comprehend the task and its scope."
	},
	{
		title: "Describe steps to reproduce an issue",
		date: "2022-10-08",
		priority: "High",
		type: "Bug",
		status: "In Progress",
		description: "including as many details as possible."
	},
	{
		title: "Provide access",
		date: "2022-10-08",
		priority: "High",
		type: "Bug",
		status: "In Progress",
		description: "to the affected account and services if possible. It might be hard to reproduce the exact environment on a local machine."
	},
	{
		title: "Provide environment information",
		date: "2022-10-08",
		priority: "High",
		type: "Bug",
		status: "In Progress",
		description: "i.e., browser version, operating system version etc. Sometimes a list of installed browser plugins and extensions might be helpful as well."
	},
	{
		title: "Provide a link to an exception and/or a stack trace",
		date: "2022-10-08",
		priority: "High",
		type: "Bug",
		status: "In Progress",
		description: "as investigating those is usually the first step to take in resolving the problem."
	},
	{
		title: "Provide access to logs",
		date: "2022-10-08",
		priority: "High",
		type: "Bug",
		status: "Done",
		description: "as they can be helpful in reproducing the steps that caused the problem in the first place."
	},
	{
		title: "Provide access to the affected server or database dump",
		date: "2022-10-08",
		priority: "High",
		type: "Bug",
		status: "Done",
		description: "If it is possible and when it does not violate security policies, it is usually helpful for the developer to access the original data that might have played a role in the problem."
	},
	{
		title: "Make a screencast",
		date: "2022-10-08",
		priority: "High",
		type: "Bug",
		status: "Done",
		description: "It is not always necessary, but many times a short screencast (or at least a screenshot) says more than a thousand words. While working on MacOS you can use QuickTime Player for the purpose but there are plenty of tools available for other operating systems as well."
	},
	{
		title: "Provide contact information",
		date: "2022-10-08",
		priority: "High",
		type: "Bug",
		status: "Done",
		description: "of the person that reported the bug. This will not always be possible, but in some cases it might be advantageous and most effective if a developer can have a chat with a person that actually experienced the bug, especially if the steps to reproduce a problem are not deterministic."
	}
	
]


function displayTasks(){
	todoColumn.innerHTML = "";
	inProgressColumn.innerHTML = "";
	doneColumn.innerHTML = "";
	c1 = 0;
	c2 = 0;
	c3 = 0;
	tasks.forEach((task,i)=>{
		createTask(task,i)
	})
}
function pLimit(str, length, end = "..."){
		return str.length < length ? str : str.substring(0, length) + end;
}


function createTask(obj, indice)
{
	const limit = pLimit(obj.description,50);
	const btn = document.createElement('button');
	btn.classList.add("col-sm-12","border", "bg-transparent", "d-flex", "align-items-start", "pb-3", "todo-task");
	btn.setAttribute("data-bs-target","#modifyModal");
	btn.setAttribute("data-bs-toggle","modal");
	let icon;
	if (obj.status == "To do") {
		icon = "far fa-question-circle";
	}else if(obj.status == "In Progress"){
		icon = "spinner-border spinner-border-sm  text-success";
	}else {
		icon = "bi bi-check-circle";
	}
	btn.addEventListener('click', function(e){
		e.preventDefault();
		ind = getIndex(indice);
	})
	btn.innerHTML = 
        `
		<div class="mt-1">
			<i class="far ${icon} text-success"></i> 
		</div>
		<div class="card-body text-start p-0 ms-2">
			<div class="card-title fw-bold">${obj.title}</div>
				<div class="">
				<div class="card-subtitle text-black-s50">#${indice+1} created in ${obj.date}</div>
				<div class="mb-2" title="${obj.description}">${limit}</div>
			</div>
			<div class="d-flex">
				<span class="btn btn-primary">${obj.priority}</span>
				<span class="btn btn-light text-dark ms-1">${obj.type}</span>
			</div>
		</div>
        `;
		
	if (obj.status == "To do") {
		todoColumn.appendChild(btn);
		c1++;
		toDoCounter.innerHTML=f;
	}else if(obj.status == "In Progress"){
		inProgressColumn.appendChild(btn);
		c2++
		inProgressCounter.innerHTML=g;
		
	}else {
		doneColumn.appendChild(btn);
		c3++
		doneCounter.innerHTML=z;
	}
}

document.addEventListener('DOMContentLoaded', displayTasks);
//Events : submit, transfer
saveBtn.addEventListener('click', function(e){
    //e.preventDefault();
	e.preventDefault();
    const titleValue = titleInput.value;
    let typeValue;
    for(i = 0; i < radioBtns.length;i++){
		if(radioBtns[i].checked == 1){
			typeValue = radioBtns[i].value;
		}
	}
    const priorityValue = priorityOptions.value;
    const statusValue = statusOptions.value;
    const dateValue = dateInput.value;
    const descriptionValue = textArea.value;

	const task = {
		title: titleValue,
		date: dateValue,
		priority : priorityValue,
		type: typeValue,
		status: statusValue,
		description : descriptionValue
	}
	addTask(task);
    //alert(`${task.title}, ${task.type}, ${task.priority}, ${task.status}, ${task.date}, ${task.description}`);
	createTask(task, indice = tasks.length-1);
	form.reset();
})

editBtn.addEventListener('click',edit);
deleteBtn.addEventListener('click', deletetask);
//document.querySelector('.to-do-task').addEventListener('click',modify(e.target,))
// Methods : display, add, remove

function addTask(task){
	tasks.push(task)
}



function getIndex(i){
	return i
}

function edit(){
	const modifiedTitle = document.querySelector('#modified-name');
	const modifiedTypes = document.querySelectorAll('#modified-type');
	const modifiedOptions = document.querySelector('#modified-select');
	const modifiedStatus = document.querySelector('#modifiedStatus-select');
	const modifiedDate = document.querySelector('#modifiedDate-calender');
	const modifiedTextArea = document.querySelector('#modifiedMessage-text');
	const task = tasks[ind];
	let modifiedType;
    for(i = 0; i < modifiedTypes.length;i++){
		if(modifiedTypes[i].checked == 1){
			modifiedType = modifiedTypes[i].value;
		}
	}
	task.title = modifiedTitle.value;
	task.type = modifiedType;
	task.priority = modifiedOptions.value;
	task.status = modifiedStatus.value;
	task.date = modifiedDate.value;
	task.description = modifiedTextArea.value;
	displayTasks();
}

function deletetask(){
	tasks.splice(ind,1);
	displayTasks()
}
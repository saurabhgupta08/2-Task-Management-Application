const inputBox = document.getElementById("input-box");
const descriptionBox = document.getElementById("description-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = `<div><span class="task-title">${inputBox.value}</span><br><span class="description">${descriptionBox.value}</span></div>`;
        listContainer.appendChild(li);
        
        let span = document.createElement("span");
        span.className="delete-button"
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        let div = document.createElement("div");
        div.className = 'task-buttons';

        let editButton = document.createElement("button");
        editButton.innerHTML = "Edit";
        editButton.onclick = () => editTask(li);
        div.appendChild(editButton);

        let statusButton = document.createElement("button");
        statusButton.innerHTML = "To Do";
        statusButton.className = "status";
        statusButton.onclick = () => updateStatus(statusButton);
        div.appendChild(statusButton);

        li.appendChild(div);
    }
    inputBox.value = "";
    descriptionBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN" && e.target.innerHTML === "\u00d7") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function editTask(taskItem) {
    const taskTitle = taskItem.querySelector(".task-title").textContent;
    const taskDescription = taskItem.querySelector(".description").textContent;

    const newTitle = prompt("Edit the task title:", taskTitle);
    const newDescription = prompt("Edit the task description:", taskDescription);

    if (newTitle) {
        taskItem.querySelector(".task-title").textContent = newTitle;
    }
    if (newDescription) {
        taskItem.querySelector(".description").textContent = newDescription;
    }
    saveData();
}

function updateStatus(statusButton) {
    const statuses = ["To Do", "In Progress", "Done"];
    let currentStatus = statusButton.innerHTML;
    let nextStatus = statuses[(statuses.indexOf(currentStatus) + 1) % statuses.length];
    statusButton.innerHTML = nextStatus;
    saveData();
}

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
    if (listContainer.innerHTML) {
        listContainer.querySelectorAll(".status").forEach(statusButton => {
            statusButton.onclick = () => updateStatus(statusButton);
        });
    }
}
showTask();

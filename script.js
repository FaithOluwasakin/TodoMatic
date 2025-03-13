let tasks = [];
function addTask() {
    let taskentry = document.getElementById("taskentry").value;
    if (taskentry.trim() === "") return;
    document.getElementById("taskentry").value = "";

    let tasksObj = {
        name: taskentry,
        completed: false
    };
        tasks.push(tasksObj);
    let taskList = document.getElementById("taskList");

    let li = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    let taskText = document.createElement("span");
    taskText.textContent = taskentry;

    checkbox.addEventListener("click", function() {
        li.classList.toggle("completed");
        tasksObj.completed = checkbox.checked;
    });

    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    
    removeButton.onclick = function() {
        tasks = tasks.filter(task => task.name !== taskentry); 
        taskList.removeChild(li); 
    };

    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(removeButton);

    taskList.appendChild(li);
}

function filterTasks(filterType) {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; 
    let filteredTasks = [];

    if (filterType === "All") {
        filteredTasks = tasks;
    } else if (filterType === "Active") {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (filterType === "Completed") {
        filteredTasks = tasks.filter(task => task.completed);
    }

    filteredTasks.forEach(task => {
        let li = document.createElement("li");

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        let taskText = document.createElement("span");
        taskText.textContent = task.name;

        li.appendChild(checkbox);
        li.appendChild(taskText);

        taskList.appendChild(li);
    });
}

let allBtn = document.querySelector(".action:nth-child(1)");
let activeBtn = document.querySelector(".action:nth-child(2)");
let completedBtn = document.getElementById("complete");

allBtn.addEventListener("click", function() {
    filterTasks("All");
});

activeBtn.addEventListener("click", function() {
    filterTasks("Active");
});

completedBtn.addEventListener("click", function() {
    filterTasks("Completed");
});

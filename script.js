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

let completedBtn = document.getElementById("complete");
completedBtn.addEventListener("click", function() {
    let completedTasks = tasks.filter(task => task.completed); 
    let taskList = document.getElementById("taskList");
    
    taskList.innerHTML = "";

    completedTasks.forEach(task => {
        let li = document.createElement("li");
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = true;
        let taskText = document.createElement("span");
        taskText.textContent = task.name;

        li.appendChild(checkbox);
        li.appendChild(taskText);

        taskList.appendChild(li);
    });
});

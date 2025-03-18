let tasks = [];

function addTask() {
    const taskName = document.getElementById("taskentry").value.trim();
    const dueDate = document.getElementById("duedate").value;

    const task = {
        id: Date.now(),
        name: taskName,
        completed: false,
        dueDate: new Date(dueDate)
    };

    tasks.push(task);
    document.getElementById("taskentry").value = "";
    document.getElementById("duedate").value = "";
    renderTasks('All'); 
    localStorage.setItem('csvData', JSON.stringify(tasks));
}

function renderTasks(filterType = "All") {
    console.log("Rendering tasks with filter:", filterType);
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if (filterType === "Undone") {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (filterType === "Completed") {
        filteredTasks = tasks.filter(task => task.completed);
    }

    console.log("Filtered tasks:", filteredTasks);

    filteredTasks.forEach((task) => {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            renderTasks(filterType);  
            localStorage.setItem('csvData', JSON.stringify(tasks));
        });

        const taskText = document.createElement("span");
        taskText.textContent = `${task.name} (Due: ${task.dueDate.toLocaleString()})`;
        if (new Date(task.dueDate) < new Date() && !task.completed) {
            li.classList.add("overdue");
        }

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.style.marginLeft = "10px";
        removeButton.addEventListener("click", () => {
            tasks = tasks.filter(t => t.id !== task.id);
            renderTasks(filterType);  
            localStorage.setItem('csvData', JSON.stringify(tasks));
        });

        li.appendChild(checkbox);
        li.appendChild(taskText);
        li.appendChild(removeButton);
        taskList.appendChild(li);
    });
}

function loadData() {
    const savedData = JSON.parse(localStorage.getItem('csvData'));
    if (savedData) {
        tasks = savedData;
        renderTasks('All');
    }
}

window.onload = function() {
    loadData();

    document.getElementById("allbtn").addEventListener("click", () => renderTasks('All'));
    document.getElementById("undonebtn").addEventListener("click", () => renderTasks('Undone'));
    document.getElementById("completebtn").addEventListener("click", () => renderTasks('Completed'));
};

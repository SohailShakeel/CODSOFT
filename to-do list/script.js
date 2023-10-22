document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    // Retrieve tasks from local storage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <span>${task}</span>
                <button class="delete-button" data-index="${index}">Delete</button>
            `;
            taskList.appendChild(listItem);
        });
    }

    renderTasks();

    addTaskButton.addEventListener("click", function() {
        const newTask = taskInput.value.trim();
        if (newTask !== "") {
            tasks.push(newTask);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
            taskInput.value = "";
        }
    });

    taskList.addEventListener("click", function(event) {
        if (event.target.className === "delete-button") {
            const index = event.target.getAttribute("data-index");
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        }
    });
});

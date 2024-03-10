// script.js

// Define a global variable to store the currently selected task ID
let selectedTaskId = null;
// Initialize taskIdCounter
let taskIdCounter = 1;

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event, status) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const target = event.target;
    target.appendChild(document.getElementById(data));
    updateTaskCount(status);
}

function updateTaskCount(status) {
    const count = document.getElementById(`${status}-tasks`).childElementCount;
    document.getElementById(`${status}-count`).innerText = `(${count})`;
}

function openNewTaskModal(status) {
    document.getElementById('newTaskModal').style.display = 'block';
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDescription').value = '';
    document.getElementById('newTaskModal').setAttribute('data-status', status);
}

function closeNewTaskModal() {
    document.getElementById('newTaskModal').style.display = 'none';
}

function addNewTask() {
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const status = document.getElementById('newTaskModal').getAttribute('data-status');
    const taskId = `task-${taskIdCounter++}`;

    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    taskElement.id = taskId;
    taskElement.draggable = true;
    taskElement.addEventListener('dragstart', drag);
    taskElement.addEventListener('click', () => openTaskDetailsPage(taskId));

    taskElement.innerHTML = `
        <h3>${title}</h3>
        <p>${description}</p>
    `;

    document.getElementById(`${status}-tasks`).appendChild(taskElement);
    updateTaskCount(status);
    closeNewTaskModal();
}

function openTaskDetailsPage(taskId) {
    // Save the selected task ID in the global variable
    selectedTaskId = taskId;
    // Open the task details page in a new tab
    window.open(`task-details.html?id=${taskId}`, '_blank');
}

// function deleteTask() {
//     const taskElement = document.getElementById(selectedTaskId);
//     taskElement.parentNode.removeChild(taskElement);
//     window.location.href = 'notion2.html';
// }


function getTaskIdFromUrl() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('id');
}

// Function to load task details based on the task ID
function loadTaskDetails() {
    const taskId = getTaskIdFromUrl();
    // Example: Fetch task details from local storage or an API
    // For demonstration purposes, let's assume we have a function `getTaskById` to fetch task details
    const task = getTaskById(taskId);
    if (task) {
        document.getElementById('taskTitle').value = task.title;
        document.getElementById('taskDescription').value = task.description;
        document.getElementById('taskStatus').value = task.status;
    }
}

// Function to save updated task details
function saveTask() {
    const taskId = getTaskIdFromUrl();
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const status = document.getElementById('taskStatus').value;

    // Example: Update task details in local storage or send a request to update task details to an API
    // For demonstration purposes, let's assume we have a function `updateTask` to update task details
    updateTask(taskId, { title, description, status });

    // Redirect back to the main project board page (index.html)
    window.location.href = 'notion2.html';
}

// Function to delete the task
function deleteTask() {
    const taskId = getTaskIdFromUrl();

    // Example: Delete the task from local storage or send a request to delete the task to an API
    // For demonstration purposes, let's assume we have a function `deleteTaskById` to delete the task
    deleteTaskById(taskId);

    // Redirect back to the main project board page (index.html)
    window.location.href = 'notion2.html';
}

// Event listener to load task details when the page is loaded
document.addEventListener('DOMContentLoaded', function () {
    loadTaskDetails();
});



// document.addEventListener('DOMContentLoaded', function () {
//     updateTaskCount('todo');
//     updateTaskCount('in-progress');
//     updateTaskCount('done');
// });



// script.js
document.addEventListener('DOMContentLoaded', loadTasks);
// Define a global variable to store the currently selected task ID
let selectedTaskId = null;
// Initialize taskIdCounter
let taskIdCounter = 1;

// Function to allow dropping tasks
function allowDrop(event) {
    event.preventDefault();
}

// Function to handle drag event
function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

// Function to handle drop event
function drop(event, status) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const target = event.target;
    target.appendChild(document.getElementById(data));
    updateTaskCount(status);
}

// Function to update task count
function updateTaskCount(status) {
    const count = document.getElementById(`${status}-tasks`).childElementCount;
    document.getElementById(`${status}-count`).innerText = `(${count})`;
}

// Function to open new task modal
function openNewTaskModal(status) {
    document.getElementById('newTaskModal').style.display = 'block';
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDescription').value = '';
    document.getElementById('newTaskModal').setAttribute('data-status', status);
}

// Function to close new task modal
function closeNewTaskModal() {
    document.getElementById('newTaskModal').style.display = 'none';
}

// Function to add new task
function addNewTask() {
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const status = document.getElementById('newTaskModal').getAttribute('data-status');
    const taskId = `task-${taskIdCounter++}`;

    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    taskElement.id = taskId;
    taskElement.draggable = true;
    taskElement.addEventListener('dragstart', drag);
    taskElement.addEventListener('click', () => openTaskDetailsPage(taskId));

    taskElement.innerHTML = `
        <h3>${title}</h3>
        <p>${description}</p>
    `;

    document.getElementById(`${status}-tasks`).appendChild(taskElement);
    updateTaskCount(status);
    closeNewTaskModal();
}

// Function to open task details page
function openTaskDetailsPage(taskId) {
    // Save the selected task ID in the global variable
    selectedTaskId = taskId;
    // Navigate to the task details page
    // window.open(`task-details.html?id=${taskId}`);
    window.location.href = `task-details.html?id=${taskId}`;
}

// Function to delete task
function deleteTask() {
    // Find and remove the selected task from the DOM
    const taskElement = document.getElementById(selectedTaskId);
    taskElement.parentNode.removeChild(taskElement);
    // Close the task details page
    window.location.href = 'index.html';
}

// Function to load tasks from local storage or API
function loadTasks() {
    // Example: Load tasks from local storage or API and populate the board
    // This function should be implemented based on your application logic
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        // Loop through tasks and populate the board
        tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task');
            taskElement.id = task.id;
            taskElement.draggable = true;
            taskElement.addEventListener('dragstart', drag);
            taskElement.addEventListener('click', () => openTaskDetailsPage(task.id));

            taskElement.innerHTML = `
                <h3>${task.title}</h3>
                <p>${task.description}</p>
            `;

            document.getElementById(`${task.status}-tasks`).appendChild(taskElement);
        });

        // Update task counts
        updateTaskCounts();
    }
}

// Event listener to load tasks when the page is loaded
document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
});

// Function to save updated task details
function saveTask() {
    const taskId = getParameterByName('id');
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const status = document.getElementById('taskStatus').value;

    // Retrieve tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks'));

    // Find the index of the task with the matching ID
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    // Update task details if the task is found
    if (taskIndex !== -1) {
        tasks[taskIndex].title = title;
        tasks[taskIndex].description = description;
        tasks[taskIndex].status = status;

        // Save the updated tasks back to local storage
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Update task details in the index page's DOM
    const taskElement = document.getElementById(taskId);
    taskElement.querySelector('h3').innerText = title;
    taskElement.querySelector('p').innerText = description;

    // Redirect back to the index page
    window.location.href = 'index.html';
}



// Define global variables
let taskIdCounter = 1;

// Function to allow dropping tasks
function allowDrop(event) {
    event.preventDefault();
}

// Function to handle drag event
function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

// Function to handle drop event
function drop(event, status) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const target = event.target;
    target.appendChild(document.getElementById(data));
    updateTaskCount(status);
}

// Function to update task count
function updateTaskCount(status) {
    const count = document.getElementById(`${status}-tasks`).childElementCount;
    document.getElementById(`${status}-count`).innerText = `(${count})`;
}

// Function to open new task modal
function openNewTaskModal(status) {
    document.getElementById('newTaskModal').style.display = 'block';
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDescription').value = '';
    document.getElementById('newTaskModal').setAttribute('data-status', status);
}

// Function to close new task modal
function closeNewTaskModal() {
    document.getElementById('newTaskModal').style.display = 'none';
}

// Function to add new task
function addNewTask() {
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const status = document.getElementById('newTaskModal').getAttribute('data-status');
    const taskId = `task-${taskIdCounter++}`;

    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    taskElement.id = taskId;
    taskElement.draggable = true;
    taskElement.addEventListener('dragstart', drag);
    taskElement.addEventListener('click', () => openTaskDetailsPage(taskId));

    taskElement.innerHTML = `
        <h3>${title}</h3>
        <p>${description}</p>
    `;

    document.getElementById(`${status}-tasks`).appendChild(taskElement);
    updateTaskCount(status);
    closeNewTaskModal();

    // Save task details to local storage
    saveTaskToLocalStorage(taskId, title, description, status);
}

// Function to open task details page
function openTaskDetailsPage(taskId) {
    // Redirect to task details page
    window.location.href = `task-details.html?id=${taskId}`;
}

// Function to save task details to local storage
function saveTaskToLocalStorage(taskId, title, description, status) {
    // Retrieve existing tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Add new task to the tasks array
    tasks.push({ id: taskId, title, description, status });

    // Save updated tasks back to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

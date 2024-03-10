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

// Function to retrieve URL parameter value by name
function getParameterByName(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Function to load task details
function loadTaskDetails() {
    const taskId = getParameterByName('id');
    const taskElement = document.getElementById(taskId);
    if (taskElement) {
        const title = taskElement.querySelector('h3').innerText;
        const description = taskElement.querySelector('p').innerText;
        const status = taskElement.parentElement.id.split('-')[0]; // Extract status from parent ID

        document.getElementById('editedTaskTitle').value = title;
        document.getElementById('editedTaskDescription').value = description;
        document.getElementById('editedTaskStatus').value = status;
    }
}

// Function to delete task
// function deleteTask() {
//     const taskId = getParameterByName('id');
//     const taskElement = document.getElementById(taskId);
//     if (taskElement) {
//         taskElement.remove();
//         let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
//         tasks = tasks.filter(task => task.id !== taskId);
//         localStorage.setItem('tasks', JSON.stringify(tasks));
//         alert('Task deleted successfully.');
//         window.location.href = 'index.html';
//     }
// }

// Function to save updated task details
// function saveTask() {
//     const taskId = getParameterByName('id');
//     const editedTitle = document.getElementById('editedTaskTitle').value;
//     const editedDescription = document.getElementById('editedTaskDescription').value;
//     const editedStatus = document.getElementById('editedTaskStatus').value;

//     let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
//     const taskIndex = tasks.findIndex(task => task.id === taskId);

//     if (taskIndex !== -1) {
//         tasks[taskIndex].title = editedTitle;
//         tasks[taskIndex].description = editedDescription;
//         tasks[taskIndex].status = editedStatus;
//         localStorage.setItem('tasks', JSON.stringify(tasks));
//         alert('Task details updated successfully.');
//         window.location.href = `index.html?id=${taskId}`;
//     } else {
//         alert('Task not found.');
//     }
// }


// Function to save updated task details
function saveTask() {
    const urlParams = new URLSearchParams(window.location.search);
    const taskId = urlParams.get('id');
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const status = document.getElementById('taskStatus').value;

    // Retrieve tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

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

    // Update the task list in the index page
    updateTaskList(status);

    // Redirect back to the index page
    window.location.href = 'index.html';
}

// Function to update the task list in the index page
function updateTaskList() {
    // Get the container element where tasks will be displayed
    const taskContainers = document.getElementsByClassName('task-container');

    // Loop over each task container
    Array.from(taskContainers).forEach(taskContainer => {
        // Clear the existing content of the task container
        taskContainer.innerHTML = '';

        // Retrieve tasks from local storage
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        // Iterate over the tasks and create HTML elements to display them
        tasks.forEach(task => {
            // Create a div element to represent the task
            const taskElement = document.createElement('div');
            taskElement.classList.add('task');
            taskElement.id = task.id;

            // Populate the task element with task details
            taskElement.innerHTML = `
                <h3>${task.title}</h3>
                <p>${task.description}</p>
            `;

            // Append the task element to the task container
            taskContainer.appendChild(taskElement);
        });
    });
}

// Call the updateTaskList function when the page is loaded
document.addEventListener('DOMContentLoaded', updateTaskList);







// Function to delete task
function deleteTask() {
    const urlParams = new URLSearchParams(window.location.search);
    const taskId = urlParams.get('id');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    alert('Task deleted successfully.');
    // Redirect back to the index page after deleting the task
    window.location.href = 'index.html';
}

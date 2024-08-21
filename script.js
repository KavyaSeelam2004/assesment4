// Get references to the DOM elements
const taskInput = document.getElementById('new-task');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const filterButtons = document.querySelectorAll('.filter-btn');

let tasks = [];

// Function to add a new task
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();

    if (taskText) {
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        tasks.push(newTask);
        taskInput.value = ''; // Clear the input field
        renderTasks(); // Render the updated list
    }
});

// Function to toggle task completion status
function toggleTaskCompletion(taskId) {
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            task.completed = !task.completed;
        }
        return task;
    });

    renderTasks(); // Re-render the updated task list
}

// Function to delete a task
function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks(); // Re-render the updated task list
}

// Function to edit a task
function editTask(taskId, newText) {
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            task.text = newText;
        }
        return task;
    });

    renderTasks(); // Re-render the updated task list
}

// Function to render tasks based on the current filter
function renderTasks(filter = 'all') {
    taskList.innerHTML = ''; // Clear existing tasks

    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') {
            return task.completed;
        } else if (filter === 'pending') {
            return !task.completed;
        } else {
            return true;
        }
    });

    // Render each task as a list item
    filteredTasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = task.completed ? 'completed' : '';

        taskItem.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button onclick="toggleTaskCompletion(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
                <button onclick="promptEditTask(${task.id})">Edit</button>
            </div>
        `;

        taskList.appendChild(taskItem); // Add task item to the list
    });
}

// Function to handle task filtering by status
filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const filter = e.target.dataset.filter;
        renderTasks(filter); // Re-render tasks based on the selected filter
    });
});

// Function to prompt for task editing
function promptEditTask(taskId) {
    const newText = prompt("Edit your task:");

    if (newText) {
        editTask(taskId, newText); // Update task with new text
    }
}

// Initial rendering of the task list
renderTasks();
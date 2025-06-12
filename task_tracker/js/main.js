
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const input = document.querySelector('.input-');
const taskList = document.querySelector('.task-list');
const addBtn = document.querySelector('.ri-corner-down-left-line');
const delBtn = document.querySelector('.delete');

addBtn.addEventListener('click', () => {
    const value = input.value.trim();
    if (value) {
        const newTask = { text: value, id: Date.now() };
        tasks.push(newTask);
        saveTasks();
        renderTasks();
        input.value = '';
    }
});

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const div = document.createElement('div');
        div.className = 'task-item flex justify-evenly items-center mt-5 text-lg mb-5';
        div.innerHTML = `
            <input type="checkbox" name="" id="" class="task-checkbox" data-idx="${tasks.indexOf(task)}" ${task.done ? 'checked' : ''}>
            <p class="task-text ${task.done ? 'line-through text-gray-400' : ''}">${task.text}</p>
            <i class="delete ri-delete-bin-fill"></i>
        `;
        taskList.appendChild(div);
    });

    document.querySelectorAll('.task-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const idx = this.getAttribute('data-idx');
            tasks[idx].done = this.checked;
            saveTasks();
            renderTasks();
        });
    });

    document.querySelectorAll('.ri-delete-bin-fill').forEach(icon => {
        icon.addEventListener('click', function() {
            const idx = this.getAttribute('data-idx');
            tasks.splice(idx, 1);
            saveTasks();
            renderTasks();
        });
    });
}

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        saveTasks();
        addBtn.click();
    }
});

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

renderTasks();
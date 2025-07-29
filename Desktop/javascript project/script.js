  let tasks = [];
        let taskIdCounter = 1;

        const taskInput = document.getElementById('taskInput');
        const addBtn = document.getElementById('addBtn');
        const taskList = document.getElementById('taskList');
        const totalTasksEl = document.getElementById('totalTasks');
        const completedTasksEl = document.getElementById('completedTasks');
        const pendingTasksEl = document.getElementById('pendingTasks');

        function addTask() {
            const taskText = taskInput.value.trim();
            
            if (taskText === '') {
                taskInput.focus();
                return;
            }

            const task = {
                id: taskIdCounter++,
                text: taskText,
                completed: false
            };

            tasks.push(task);
            taskInput.value = '';
            renderTasks();
            updateStats();
            taskInput.focus();
        }

        function deleteTask(id) {
            tasks = tasks.filter(task => task.id !== id);
            renderTasks();
            updateStats();
        }

        function toggleTask(id) {
            tasks = tasks.map(task => 
                task.id === id ? { ...task, completed: !task.completed } : task
            );
            renderTasks();
            updateStats();
        }

        function renderTasks() {
            if (tasks.length === 0) {
                taskList.innerHTML = '<div class="empty-state">No tasks yet. Add one above!</div>';
                return;
            }

            taskList.innerHTML = tasks.map(task => `
                <li class="task-item ${task.completed ? 'completed' : ''}">
                    <div class="task-checkbox ${task.completed ? 'checked' : ''}" 
                         onclick="toggleTask(${task.id})"></div>
                    <span class="task-text">${task.text}</span>
                    <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
                </li>
            `).join('');
        }

        function updateStats() {
            const total = tasks.length;
            const completed = tasks.filter(task => task.completed).length;
            const pending = total - completed;

            totalTasksEl.textContent = total;
            completedTasksEl.textContent = completed;
            pendingTasksEl.textContent = pending;
        }

        // Event listeners
        addBtn.addEventListener('click', addTask);
        
        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addTask();
            }
        });

        // Initialize
        renderTasks();
        updateStats();
        taskInput.focus();

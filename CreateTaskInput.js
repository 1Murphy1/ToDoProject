import storage from './storage.js'; 

function CreateTaskInput() {
    const container = document.createElement('div');
    container.className = 'createTaskContainer';

    container.innerHTML = `
        <div class="createTaskContainer-common">
            <div class="createTaskContainer-common-input">
                <input class="yellowOutline" placeholder="Title..." id="titleInput">
                <input class="yellowOutline" placeholder="About..." id="aboutInput">        
            </div>
            <button class="yellowOutline" id="addButton">+</button>
        </div>
        <div class="task-list">
            <p class="task-list-none">No tasks</p>
        </div>`;

    document.body.appendChild(container);

    const addButton = container.querySelector('#addButton');
    const titleInput = container.querySelector('#titleInput');
    const aboutInput = container.querySelector('#aboutInput');
    const noTasksMessage = container.querySelector('.task-list-none');
    const taskList = container.querySelector('.task-list');

    
    const tasks = storage.getTasks();
    tasks.forEach(taskData => addTaskToDOM(taskData.title, taskData.about, taskData.id));

    if (tasks.length === 0) {
        noTasksMessage.style.display = 'block';
    } else {
        noTasksMessage.style.display = 'none'; 
    }

    addButton.addEventListener('click', () => {
        const title = titleInput.value.trim();
        const about = aboutInput.value.trim();

        if (title && about) {
            const task = { title, about }; 
            const savedTask = storage.addTask(task);
            addTaskToDOM(savedTask.title, savedTask.about, savedTask.id);         
            titleInput.value = '';
            aboutInput.value = '';

            noTasksMessage.style.display = 'none'; 
        } else {
            alert('The fields should not be empty.');
        }
    });

    function addTaskToDOM(title, about, taskId) {
        const taskContainer = document.createElement('div');
        taskContainer.className = 'taskContainer';

        const task = document.createElement('div');
        task.className = 'newTask-container yellowOutline';
        task.innerHTML = `
            <div class="newTask-container-text">
                <h3>${title}</h3>
                <p>${about}</p>
            </div>
            <button class="yellowOutline deleteButton">x</button>
        `;

        const actionPanel = document.createElement('div');
        actionPanel.className = 'task-action-panel' ;
        actionPanel.style.display = 'none'; 
        actionPanel.innerHTML = `
            <div class="task-action-panel-buttons ">
                <button class="share yellowOutline"><img src="../shareButton.svg"></button>
                <button class="info yellowOutline">i</button>
                <button class="edit yellowOutline"><img src="../editButton.svg"></button>
                
            </div>
        `;

        taskContainer.appendChild(task);
        taskContainer.appendChild(actionPanel);
        taskList.appendChild(taskContainer);

        task.addEventListener('click', () => {
            actionPanel.style.display = actionPanel.style.display === 'none' ? 'block' : 'none';
        });

        const deleteButton = task.querySelector('.deleteButton');
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation(); 
            const confirmation = document.createElement('div');
            confirmation.className = 'confirmation';
            confirmation.innerHTML = `
                <div class="confirmation-dialog yellowOutline">
                    <div class="confirmation-content">
                        <p>Delete this task?</p>
                        <div class="confirmation-content-button">
                            <button class="confirm yellowOutline">Yes</button>
                            <button class="cancel yellowOutline">No</button>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(confirmation);

            confirmation.querySelector('.confirm').addEventListener('click', () => {
                taskList.removeChild(taskContainer);
                storage.deleteTask(taskId); 
                if (taskList.children.length === 0) {
                    noTasksMessage.style.display = 'block'; 
                }
                document.body.removeChild(confirmation); 
            });

            confirmation.querySelector('.cancel').addEventListener('click', () => {
                document.body.removeChild(confirmation); 
            });
        });
        const shareButton = actionPanel.querySelector('.share');
        shareButton.addEventListener('click', (e) => {
            e.stopPropagation();
            showShare();
        });
    }

        function showShare() {
            const share = document.createElement('div');
            share.className = 'shareContainer';
            share.innerHTML = `
                <div class="shareContainer-content"
                    <div class="shareContainer-content-buttons">
                        <button class="share-icon"><img src="copyButton.svg"></button>
                        <button class="share-icon"><img src="vkButton.svg"></button>
                        <button class="share-icon"><img src="telegramButton.svg"></button>
                        <button class="share-icon"><img src="whatsappButton.svg"></button>
                        <button class="share-icon"><img src="facebookButton.svg"></button>
                    </div>
                </div>
            `;
            document.body.appendChild(share);

            share.addEventListener('click', (e) => {
                if (e.target === share) {
                    document.body.removeChild(share);
                }
            });
    }
}

document.addEventListener("DOMContentLoaded", CreateTaskInput);

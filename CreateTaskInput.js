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
    

    addButton.addEventListener('click', () => {
        const title = titleInput.value.trim();
        const about = aboutInput.value.trim();

        if (title && about) {
            const task = document.createElement('div');
            task.className = 'newTask-container yellowOutline';
            task.innerHTML = `
                <div class="newTask-container_text ">
                    <h3>${title}</h3>
                    <p>${about}</p>
                </div>
                <button class="yellowOutline" id="deleteButton">x</button>
            `;
            taskList.appendChild(task);
            titleInput.value = '';
            aboutInput.value = '';

            noTasksMessage.style.display = 'none'; 
        
            const deleteButton = task.querySelector('#deleteButton');

            deleteButton.addEventListener('click', () => {
                const confirmation = document.createElement('div');
                confirmation.className = 'confirmation-dialog';
                confirmation.innerHTML = `
                    <div class="confirmation-content">
                        <p>Вы уверены, что хотите удалить эту задачу?</p>
                        <button class="confirm">Да</button>
                        <button class="cancel">Нет</button>
                    </div>
                `;
                document.body.appendChild(confirmation);

                confirmation.querySelector('.confirm').addEventListener('click', () => {
                    taskList.removeChild(task);
                    if (taskList.children.length === 0) {
                        noTasksMessage.style.display = 'block'; 
                    }
                    document.body.removeChild(confirmation); 
                });

                confirmation.querySelector('.cancel').addEventListener('click', () => {
                    document.body.removeChild(confirmation); 
                });
            });
        } else {
            alert('Поля не должны быть пустыми.');
        }
    });
}

document.addEventListener("DOMContentLoaded", CreateTaskInput);

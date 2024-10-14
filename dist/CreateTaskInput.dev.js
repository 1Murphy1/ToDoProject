"use strict";

function CreateTaskInput() {
  var container = document.createElement('div');
  container.className = 'createTaskContainer';
  container.innerHTML = "\n        <div class=\"createTaskContainer-common\">\n            <div class=\"createTaskContainer-common-input\">\n                <input class=\"yellowOutline\" placeholder=\"Title...\" id=\"titleInput\">\n                <input class=\"yellowOutline\" placeholder=\"About...\" id=\"aboutInput\">        \n            </div>\n            <button class=\"yellowOutline\" id=\"addButton\">+</button>\n        </div>\n        <div class=\"task-list\">\n            <p class=\"task-list-none\">No tasks</p>\n        </div>";
  document.body.appendChild(container);
  var addButton = container.querySelector('#addButton');
  var titleInput = container.querySelector('#titleInput');
  var aboutInput = container.querySelector('#aboutInput');
  var noTasksMessage = container.querySelector('.task-list-none');
  var taskList = container.querySelector('.task-list');
  addButton.addEventListener('click', function () {
    var title = titleInput.value.trim();
    var about = aboutInput.value.trim();

    if (title && about) {
      var task = document.createElement('div');
      task.className = 'newTask-container yellowOutline';
      task.innerHTML = "\n                <div class=\"newTask-container-text \">\n                    <h3>".concat(title, "</h3>\n                    <p>").concat(about, "</p>\n                </div>\n                <button class=\"yellowOutline\" id=\"deleteButton\">x</button>\n            ");
      taskList.appendChild(task);
      titleInput.value = '';
      aboutInput.value = '';
      noTasksMessage.style.display = 'none';
      var deleteButton = task.querySelector('#deleteButton');
      deleteButton.addEventListener('click', function () {
        var confirmation = document.createElement('div');
        confirmation.className = 'confirmation-dialog yellowOutline';
        confirmation.innerHTML = "\n                    <div class=\"confirmation-content\">\n                        <p>\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B, \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u044D\u0442\u0443 \u0437\u0430\u0434\u0430\u0447\u0443?</p>\n                        <div class=\"confirmation-content-button\">\n                            <button class=\"confirm yellowOutline\">\u0414\u0430</button>\n                            <button class=\"cancel yellowOutline\">\u041D\u0435\u0442</button>\n                        </div>\n                    </div>\n                    \n                ";
        document.body.appendChild(confirmation);
        confirmation.querySelector('.confirm').addEventListener('click', function () {
          taskList.removeChild(task);

          if (taskList.children.length === 0) {
            noTasksMessage.style.display = 'block';
          }

          document.body.removeChild(confirmation);
        });
        confirmation.querySelector('.cancel').addEventListener('click', function () {
          document.body.removeChild(confirmation);
        });
      });
    } else {
      alert('Поля не должны быть пустыми.');
    }
  });
}

document.addEventListener("DOMContentLoaded", CreateTaskInput);
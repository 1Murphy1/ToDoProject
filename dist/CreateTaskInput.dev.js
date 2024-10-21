"use strict";

var _storage = _interopRequireDefault(require("./storage.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

  var tasks = _storage["default"].getTasks();

  tasks.forEach(function (taskData) {
    return addTaskToDOM(taskData.title, taskData.about, taskData.id);
  });

  if (tasks.length === 0) {
    noTasksMessage.style.display = 'block';
  } else {
    noTasksMessage.style.display = 'none';
  }

  addButton.addEventListener('click', function () {
    var title = titleInput.value.trim();
    var about = aboutInput.value.trim();

    if (title && about) {
      var task = {
        title: title,
        about: about
      };

      var savedTask = _storage["default"].addTask(task);

      addTaskToDOM(savedTask.title, savedTask.about, savedTask.id);
      titleInput.value = '';
      aboutInput.value = '';
      noTasksMessage.style.display = 'none';
    } else {
      alert('The fields should not be empty.');
    }
  });

  function addTaskToDOM(title, about, taskId) {
    var taskContainer = document.createElement('div');
    taskContainer.className = 'taskContainer';
    var task = document.createElement('div');
    task.className = 'newTask-container yellowOutline';
    task.innerHTML = "\n            <div class=\"newTask-container-text\">\n                <h3>".concat(title, "</h3>\n                <p>").concat(about, "</p>\n            </div>\n            <button class=\"yellowOutline deleteButton\">x</button>\n        ");
    var actionPanel = document.createElement('div');
    actionPanel.className = 'task-action-panel';
    actionPanel.style.display = 'none';
    actionPanel.innerHTML = "\n            <div class=\"task-action-panel-buttons \">\n                <button class=\"share yellowOutline\"><img src=\"../shareButton.svg\"></button>\n                <button class=\"info yellowOutline\">i</button>\n                <button class=\"edit yellowOutline\"><img src=\"../editButton.svg\"></button>\n                \n            </div>\n        ";
    taskContainer.appendChild(task);
    taskContainer.appendChild(actionPanel);
    taskList.appendChild(taskContainer);
    task.addEventListener('click', function () {
      actionPanel.style.display = actionPanel.style.display === 'none' ? 'block' : 'none';
    });
    var deleteButton = task.querySelector('.deleteButton');
    deleteButton.addEventListener('click', function (e) {
      e.stopPropagation();
      var confirmation = document.createElement('div');
      confirmation.className = 'confirmation';
      confirmation.innerHTML = "\n                <div class=\"confirmation-dialog yellowOutline\">\n                    <div class=\"confirmation-content\">\n                        <p>Delete this task?</p>\n                        <div class=\"confirmation-content-button\">\n                            <button class=\"confirm yellowOutline\">Yes</button>\n                            <button class=\"cancel yellowOutline\">No</button>\n                        </div>\n                    </div>\n                </div>\n            ";
      document.body.appendChild(confirmation);
      confirmation.querySelector('.confirm').addEventListener('click', function () {
        taskList.removeChild(taskContainer);

        _storage["default"].deleteTask(taskId);

        if (taskList.children.length === 0) {
          noTasksMessage.style.display = 'block';
        }

        document.body.removeChild(confirmation);
      });
      confirmation.querySelector('.cancel').addEventListener('click', function () {
        document.body.removeChild(confirmation);
      });
    });
    var shareButton = actionPanel.querySelector('.share');
    shareButton.addEventListener('click', function (e) {
      e.stopPropagation();
      showShare();
    });
  }

  function showShare() {
    var share = document.createElement('div');
    share.className = 'shareContainer';
    share.innerHTML = "\n                <div class=\"shareContainer-content\"\n                    <div class=\"shareContainer-content-buttons\">\n                        <button class=\"share-icon\"><img src=\"copyButton.svg\"></button>\n                        <button class=\"share-icon\"><img src=\"vkButton.svg\"></button>\n                        <button class=\"share-icon\"><img src=\"telegramButton.svg\"></button>\n                        <button class=\"share-icon\"><img src=\"whatsappButton.svg\"></button>\n                        <button class=\"share-icon\"><img src=\"facebookButton.svg\"></button>\n                    </div>\n                </div>\n            ";
    document.body.appendChild(share);
    share.addEventListener('click', function (e) {
      if (e.target === share) {
        document.body.removeChild(share);
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", CreateTaskInput);
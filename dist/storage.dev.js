"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LocalTaskStorage =
/*#__PURE__*/
function () {
  function LocalTaskStorage() {
    _classCallCheck(this, LocalTaskStorage);
  }

  _createClass(LocalTaskStorage, [{
    key: "super",
    value: function _super() {
      this.storageKey = "tasks";
    }
  }, {
    key: "getTasks",
    value: function getTasks() {
      var tasksJson = localStorage.getItem(this.storageKey);
      return tasksJson ? JSON.parse(tasksJson) : [];
    }
  }, {
    key: "addTask",
    value: function addTask(task) {
      var tasks = this.getTasks();
      task.id = Date.now();
      tasks.push(task);
      localStorage.setItem(this.storageKey, JSON.stringify(tasks));
      return task;
    }
  }, {
    key: "deleteTask",
    value: function deleteTask(taskId) {
      var tasks = this.getTasks();
      var updatedTasks = tasks.filter(function (task) {
        return task.id !== taskId;
      });
      localStorage.setItem(this.storageKey, JSON.stringify(updatedTasks));
      return taskId;
    }
  }]);

  return LocalTaskStorage;
}();

var storage = new LocalTaskStorage();
var _default = storage;
exports["default"] = _default;
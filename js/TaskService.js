function TaskService() {
  this.getListTaskApi = function () {
    return axios({
      url: "https://5fd46f3be9cda40016f5bf0a.mockapi.io/api/Task",
      method: "GET",
    });
  };

  this.addTaskApi = function (task) {
    return axios({
      url: "https://5fd46f3be9cda40016f5bf0a.mockapi.io/api/Task",
      method: "POST",
      data: task,
    });
  };

  this.deleteTaskApi = function (id) {
    return axios({
      url: `https://5fd46f3be9cda40016f5bf0a.mockapi.io/api/Task/${id}`,
      method: "DELETE",
    });
  };

  this.updateTaskApi = function (task) {
    return axios({
      url: `https://5fd46f3be9cda40016f5bf0a.mockapi.io/api/Task/${task.id}`,
      method: "PUT",
      data: task,
    });
  };

  this.getTaskByIdAPI = function (id) {
    return axios({
      url: `https://5fd46f3be9cda40016f5bf0a.mockapi.io/api/Task/${id}`,
      method: "GET",
    });
  };
}

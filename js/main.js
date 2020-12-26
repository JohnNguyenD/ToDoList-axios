var service = new TaskService();

showListTask();

function getElement(input) {
  return document.getElementById(input);
}

function showListTask() {
  service
    .getListTaskApi()
    .then((res) => {
      createToDoList(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function updateTask(task) {
  service
    .updateTaskApi(task)
    .then((result) => {
      showListTask();
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
}

getElement("addItem").addEventListener("click", () => {
  var taskName = getElement("newTask").value;
  var id = Math.floor(Math.random() * 100);
  var status = "todo";

  var task = new Task(id, taskName, status);

  service
    .addTaskApi(task)
    .then((res) => {
      alert("Add successfully");
      showListTask();
    })
    .catch((err) => {
      console.log(err);
    });
});

function createToDoList(arr) {
  var todoContent = "";
  var completedContent = "";
  arr.map((item) => {
    if (item.status === "todo") {
      todoContent += `
          <li><p>${item.taskName}</p>
              <button id="deleteButton" onclick="deleteButton('${item.id}')"><i class="fa fa-trash"></i></button>
              <button id="checkButton" onclick="updateButton('${item.id}')"><i class="fa fa-check"></i></button>
          </li>
      `;
    } else {
      completedContent += `
          <li><p style="color:#25b99a">${item.taskName}</p>
              <button id="deleteButton" onclick="deleteButton('${item.id}')"><i class="fa fa-trash"></i></button>
              <button id="checkButton" onclick="updateButton('${item.id}')" style="color:#25b99a"><i class="fa fa-check"></i></button>
          </li>
      `;
    }
  });

  getElement("todo").innerHTML = todoContent;
  getElement("completed").innerHTML = completedContent;
}

function deleteButton(id) {
  service
    .deleteTaskApi(id)
    .then((res) => {
      alert("Delete sucessfully");
      showListTask();
    })
    .catch((err) => {
      console.log(err);
    });
}

function updateButton(id) {
  service
    .getTaskByIdAPI(id)
    .then((result) => {
      result.data.status = "todo" === result.data.status ? "completed" : "todo";
    })
    .catch((err) => {
      console.log(err);
    });
}

var service = new TaskService();
var isLoading = false;
var validate = new Validation();
var arr = [];
showListTask();

function checkLoading() {
  if (isLoading) getElement("loading").style.display = "block";
  else getElement("loading").style.display = "none";
}

function getElement(input) {
  return document.getElementById(input);
}

function showListTask() {
  isLoading = true;
  checkLoading();
  service
    .getListTaskApi()
    .then((res) => {
      isLoading = false;
      checkLoading();
      createToDoList(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

// showAllTasks();
// function showAllTasks() {
//   service
//     .getListTaskApi()
//     .then((result) => {
//       arr.push(result.data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

function updateTask(task) {
  service
    .updateTaskApi(task)
    .then((result) => {
      showListTask();
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
  var isEmpty = false;
  var isDuplicated = false;

  isEmpty = validate.checkEmpty(
    taskName,
    "error",
    "(*) Task can't leave blank"
  );

  isDuplicated = validate.checkDuplicateTask(
    taskName,
    "notiInput",
    "(*) This task has already been existed"
  );

  if (isEmpty || isDuplicated) return;

  service
    .addTaskApi(task)
    .then((res) => {
      alert("Add successfully");
      showListTask();
      getElement("newTask").value = "";
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
      showListTask();
      alert("Delete Successfully");
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
      updateTask(result.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

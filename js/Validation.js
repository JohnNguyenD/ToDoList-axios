var service = new TaskService();

function Validation() {
  this.checkEmpty = function (input, spanId, message) {
    if (input === "") {
      getElement(spanId).style.display = "block";
      getElement(spanId).innerHTML = message;
      return true;
    } else {
      getElement(spanId).style.display = "none";
      getElement(spanId).innerHTML = "";
      return false;
    }
  };

  this.checkDuplicateTask = function (input, spanId, message) {
    var isNotDuplicate = true;
    service
      .getListTaskApi()
      .then((result) => {
        result.data.map((item) => {
          if (item.taskName === input) {
            getElement(spanId).style.display = "block";
            getElement(spanId).innerHTML = message;
            isNotDuplicate = false;
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
    if (isNotDuplicate) {
      getElement(spanId).style.display = "none";
      getElement(spanId).innerHTML = "";
    }
    return isNotDuplicate;
  };
}

const localstorageTasks = JSON.parse(localStorage.getItem("tasks"));
let tasksList = localstorageTasks ? localstorageTasks : [];

function updateLocalstorage() {
  localStorage.setItem("tasks", JSON.stringify(tasksList));
}

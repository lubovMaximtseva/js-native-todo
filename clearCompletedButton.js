function deleteCompletedTasks() {
  const newTasksList = tasksList.filter(task => task.completed === false);
  tasksList = newTasksList;
  const tasks = checkFilter(tasksList);
  renderTasks(tasks);
  checkFooter(tasksList);
  updateLocalstorage();
}

function checkClearCompleted(tasks) {
  const completedTaskList = tasks.filter(task => task.completed === true);
  const button = document.getElementsByClassName("clear-completed")[0];
  if (completedTaskList.length === 0) {
    button.style.display = "none";
  } else {
    button.style.display = "inline-block";
  }
}

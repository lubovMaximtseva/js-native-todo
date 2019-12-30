function deleteTask(event) {
  const id = event.target.parentNode.parentNode.id;
  const newTasksList = tasksList.filter(task => task.id !== id);
  tasksList = newTasksList;
  const tasks = checkFilter(tasksList);
  renderTasks(tasks);
  countActiveTasks(tasksList);
  checkClearCompleted(tasksList);
  checkFooter(tasksList);
  updateLocalstorage();
}

function toggleTask(event) {
  const li = event.target.parentNode.parentNode;
  const newTaskList = tasksList.map(task => {
    if (task.id === li.id) {
      li.className = `todo ${!task.completed ? "completed" : ""}`;
      return { id: li.id, text: task.text, completed: !task.completed };
    }
    return task;
  });
  tasksList = newTaskList;
  countActiveTasks(tasksList);
  const tasks = checkFilter(tasksList);
  renderTasks(tasks);
  checkClearCompleted(tasksList);
  updateLocalstorage();
}

function filtrTasks(filter) {
  const completed = document.getElementById("completed");
  const active = document.getElementById("active");
  const all = document.getElementById("all");
  let newTasksList;
  switch (filter) {
    case "all":
      all.className = "selected";
      completed.className = "";
      active.className = "";
      renderTasks(tasksList);
      break;
    case "active":
      active.className = "selected";
      all.className = "";
      completed.className = "";
      newTasksList = tasksList.filter(task => task.completed === false);
      renderTasks(newTasksList);
      break;
    case "completed":
      completed.className = "selected";
      active.className = "";
      all.className = "";
      newTasksList = tasksList.filter(task => task.completed === true);
      renderTasks(newTasksList);
      break;
  }
}

function checkFilter(tasks) {
  const filter = window.location.hash;
  if (filter === "#/active") {
    return tasks.filter(task => !task.completed);
  }
  if (filter === "#/completed") {
    return tasks.filter(task => task.completed);
  }
  return tasks;
}

const localstorageTasks = JSON.parse(localStorage.getItem("tasks"));
let tasksList = localstorageTasks ? localstorageTasks : [];

window.onload = () => {
  checkFooter(tasksList);
  renderTasks(tasksList);
  countActiveTasks(tasksList);
  const filter = window.location.hash.slice(2);
  filtrTasks(filter);
};

function createListItem(task) {
  const label = document.createElement("label");
  label.innerHTML = task.text;
  const button = document.createElement("button");
  button.className = "destroy";
  button.onclick = deleteTask;
  const input = document.createElement("input");
  input.className = "toggle";
  input.type = "checkbox";
  input.checked = task.completed;
  input.onchange = toggleTask;
  const div = document.createElement("div");
  div.className = "view";
  div.appendChild(input);
  div.appendChild(label);
  div.appendChild(button);
  const li = document.createElement("li");
  li.className = `todo${task.completed ? " completed" : ""}`;
  li.setAttribute("id", task.id);
  li.appendChild(div);

  return li;
}

function renderTasks(tasks) {
  const ul = document.querySelector("ul");
  ul.innerHTML = "";
  for (let task of tasks) {
    const li = createListItem(task);
    ul.appendChild(li);
  }
}

function getId(tasks) {
  if (tasks.length === 0) {
    return "1";
  }
  const ids = tasks.map(item => +item.id);
  let maxId = ids[0];
  for (let id of ids) {
    if (id > maxId) {
      maxId = id;
    }
  }
  const newId = String(maxId + 1);
  return newId;
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

function createNewTask() {
  const input = document.getElementsByClassName("new-todo")[0];
  let newTask = {};
  newTask.id = getId(tasksList);
  newTask.text = input.value;
  newTask.completed = false;
  tasksList.push(newTask);
  input.value = "";
  const tasks = checkFilter(tasksList);
  renderTasks(tasks);
  countActiveTasks(tasksList);
  checkFooter(tasksList);
  updateLocalstorage();
}

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

function countActiveTasks(tasks) {
  const newTasksList = tasks.filter(task => task.completed === false);
  const strong = document.getElementById("countTask");
  strong.innerHTML = newTasksList.length;
}

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

function checkFooter(tasks) {
  const footer = document.getElementsByClassName("footer")[0];
  if (tasks.length === 0) {
    footer.style.display = "none";
  } else {
    footer.style.display = "";
  }
}

function updateLocalstorage() {
  localStorage.setItem("tasks", JSON.stringify(tasksList));
}

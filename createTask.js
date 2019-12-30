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

function renderTasks(tasks) {
  const ul = document.querySelector("ul");
  ul.innerHTML = "";
  for (let task of tasks) {
    const li = createListItem(task);
    ul.appendChild(li);
  }
}

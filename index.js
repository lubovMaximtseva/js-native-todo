let tasksList = [
  { id: "1", text: "synthesize", completed: true },
  { id: "2", text: "override", completed: false },
  { id: "3", text: "index", completed: true },
  { id: "4", text: "compress", completed: false },
  { id: "5", text: "compress", completed: false },
  { id: "6", text: "override", completed: true },
  { id: "7", text: "generate", completed: true }
];

renderTasks(tasksList);
countActiveTasks(tasksList);

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

function createNewTask() {
  const input = document.getElementsByClassName("new-todo")[0];
  let newTask = {};
  newTask.id = getId(tasksList);
  newTask.text = input.value;
  newTask.completed = false;
  tasksList.push(newTask);
  input.value = "";
  renderTasks(tasksList);
  countActiveTasks(tasksList);
}

function deleteTask(event) {
  const id = event.target.parentNode.parentNode.id;
  const newTasksList = tasksList.filter(task => task.id !== id);
  tasksList = newTasksList;
  renderTasks(tasksList);
  countActiveTasks(tasksList);
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
}

function countActiveTasks(tasks) {
  const newTasksList = tasks.filter(task => task.completed === false);
  const strong = document.getElementById("countTask");
  strong.innerHTML = newTasksList.length;
}

function deleteCompletedTasks() {
  const newTasksList = tasksList.filter(task => task.completed === false);
  tasksList = newTasksList;
  renderTasks(tasksList);
}

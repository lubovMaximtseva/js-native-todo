function countActiveTasks(tasks) {
  const newTasksList = tasks.filter(task => task.completed === false);
  const strong = document.getElementById("countTask");
  strong.innerHTML = newTasksList.length;
}

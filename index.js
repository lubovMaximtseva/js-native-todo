window.onload = () => {
  checkFooter(tasksList);
  renderTasks(tasksList);
  countActiveTasks(tasksList);
  const filter = window.location.hash.slice(2);
  filtrTasks(filter);
};

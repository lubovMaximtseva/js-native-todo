function checkFooter(tasks) {
  const footer = document.getElementsByClassName("footer")[0];
  if (tasks.length === 0) {
    footer.style.display = "none";
  } else {
    footer.style.display = "";
  }
}

use: "strict";

window.addEventListener("load", () => {
  // SELECTORS
  const form = document.querySelector("#new-task-form");
  const formInput = document.querySelector("#new-task-input");
  const formSubmit = document.querySelector("#new-task-submit");
  const taskList = document.querySelector("#tasks");
  const edit = document.querySelector(".edit");
  const del = document.querySelector(".delete");

  // Prevent page reloading when submitting the form
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const task = formInput.value;

    // When press submit with no text typed in
    if (!task) {
      alert("Add a task!");
      return;
    }

    /// ELSE

    // Add a task
    // Create DOM nodes - divs - to add tasks
    const newTask = document.createElement("div");
    newTask.classList.add("task");

    const newContent = document.createElement("div");
    newContent.classList.add("content");

    // Append newContent to newTask
    newTask.appendChild(newContent);

    const newInput = document.createElement("input");
    newInput.classList.add("text");
    newInput.type = "text";
    newInput.value = task;
    newInput.setAttribute("readonly", "readonly");
    console.log(newInput);

    newContent.appendChild(newInput);
    taskList.appendChild(newTask);

    // Edit task

    // Edit & Save functionality

    // Delete task
  });
});

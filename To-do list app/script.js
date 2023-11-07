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

    // Create newInput and set it to task
    const newInput = document.createElement("input");
    newInput.classList.add("text");
    newInput.type = "text";
    newInput.value = task;
    newInput.setAttribute("readonly", "readonly");
    console.log(newInput);

    newContent.appendChild(newInput);
    taskList.appendChild(newTask);

    // Edit task
    // Create DOM NOdes
    const newAction = document.createElement("div");
    newAction.classList.add("actions");

    const newEdit = document.createElement("button");
    newEdit.classList.add = "edit";
    newEdit.innerHTML = "Edit";

    const newDel = document.createElement("button");
    newDel.classList.add = "delete";
    newDel.innerHTML = "Delete";

    newAction.appendChild(newEdit);
    newAction.appendChild(newDel);

    newTask.appendChild(newAction);

    taskList.appendChild(newTask);

    // Clear input bar
    formInput.value = "";
    formInput.blur();

    // Edit & Save functionality
    newEdit.addEventListener("click", () => {
      // Upon click, if the edit button is 'edit' then allow editing
      if (newEdit.innerText.toLowerCase() == "edit") {
        newInput.removeAttribute("readonly");
        newInput.focus();
        newEdit.innerText = "Save";
        // Anything else upon click (save), change it back to normal
      } else {
        newInput.setAttribute("readonly", "readonly");
        newEdit.innerText = "Edit";
      }
    });

    // Delete task
    newDel.addEventListener("click", () => {
      taskList.removeChild(newTask);
    });
  });
});

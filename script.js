const button = document.querySelector("#push-btn");
const input = document.querySelector("#new-task input");
const tasks = document.querySelector("#tasks");

// Load tasks from local storage on page load
window.addEventListener("load", () => {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks.innerHTML = savedTasks;
    tasks.style.display = "block";
    addEventListenersToTasks();
  }
});

// Add new task
button.addEventListener("click", () => {
  // Validate input field
  if (input.value.length === 0) {
    alert("Please enter a task.");
  } else {
    // Add a new task
    tasks.style.display = "block";
    const div = document.createElement("div");
    div.className += "task"; // Adding class name
    div.innerHTML = `<span class="item">${input.value}</span> <button class="delete-btn"><i class="fa-solid fa-trash-can" style="color: #ffffff;"></i></button>`;

    // Append div element inside the document
    tasks.appendChild(div);

    // Add event listeners to tasks
    addEventListenersToTasks();

    // Save tasks to local storage
    saveTasks();

    // Clearing the input field after each entry
    input.value = "";
  }
});

// Function for completed task
function crossToggleItem() {
  this.classList.toggle("completed");
  saveTasks();
}

// Function for deleting task
function deleteItem() {
  this.parentNode.remove();
  if (tasks.innerHTML === "") {
    tasks.style.display = "none";
  }
  saveTasks();
}

// Add event listeners to tasks
function addEventListenersToTasks() {
  document.querySelectorAll(".item").forEach((e) => {
    e.removeEventListener("click", crossToggleItem);
    e.addEventListener("click", crossToggleItem);
  });

  document.querySelectorAll(".delete-btn").forEach((e) => {
    e.removeEventListener("click", deleteItem);
    e.addEventListener("click", deleteItem);
  });
}

// Save tasks to local storage
function saveTasks() {
  localStorage.setItem("tasks", tasks.innerHTML);
}

document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  // store the task
  // convert string to orignal data structure (array of object)
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // printing the task from local storage to screen
  tasks.forEach((task) => renderTask(task));

  addTaskButton.addEventListener("click", () => {
    const taskText = todoInput.value.trim();
    // if task text is empty ten return
    if (taskText === "") return;

    const newTask = {
      // creating unique id
      id: Date.now(),
      text: taskText,
      completed: false,
    };

    // new task added
    tasks.push(newTask);
    saveTasks();
    renderTask(newTask);
    // after adding clear input field so, that we can add more task
    todoInput.value = "";
    console.log(tasks);
  });

  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);

    if (task.completed) {
      li.classList.add("completed");
    }

    li.innerHTML = `<span>${task.text}</span>
                  <button>delete</button>
  `;

    li.addEventListener("click", (event) => {
      if (event.target.tagName === "BUTTON") return;
      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTasks();
    });

    li.querySelector("button").addEventListener("click", (event) => {
      event.stopPropagation(); // prevent toggle from firing
      tasks = tasks.filter((t) => {
        return t.id !== task.id;
      });
      li.remove(); // not from the local storage
      saveTasks();
    });
    todoList.appendChild(li);
  }

  // save tasks array into local storage
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});

document.addEventListener('DOMContentLoaded', () => {
const todoInput = document.getElementById("todo-input"); // Get the input field for the task.
const addTaskButton = document.getElementById("add-task-btn");
const todoList = document.getElementById("todo-list");

let tasks= JSON.parse(localStorage.getItem("tasks")) || [];

tasks.forEach((task) => renderTask(task));

addTaskButton.addEventListener("click", ()=> {
  const taskText = todoInput.value.trim();  // Get the value from the input field. Using trim to remove the extra spaces entered at the end.
  if(taskText === "") return; // If the input is empty, do nothing and exit.

  const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false
  }
  tasks.push(newTask);
  saveTasks(); // Save the tasks to local storage.
  renderTask(newTask);
  todoInput.value="";
  console.log(tasks);
});

function renderTask(task) {
  const li = document.createElement('li')
  li.setAttribute('data-id', task.id);
  if(task.completed) li.classList.add('completed');
      li.innerHTML= `
  <span>${task.text}</span>
  <button>delete</button>
  `;

  li.addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON') return;
    task.completed = !task.completed;
    li.classList.toggle('completed');
    saveTasks() // Save the tasks to local storage.
  });

  li.querySelector('button').addEventListener('click', (e) => {
    e.stopPropagation() //prevent toggling the completed class when clicking the delete button.
    tasks = tasks.filter(t => t.id !== task.id);
    li.remove();
    saveTasks();
  })

  todoList.appendChild(li);
}

function saveTasks(){
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Save the tasks to local storage.
}


});
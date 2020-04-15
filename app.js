//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo");
let filterOption = document.querySelector("filter-todo");

//event listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption = addEventListener("click", filterTodo);

//functions
function addTodo(event) {
  // prevent form from submitting
  event.preventDefault();

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todos");

  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  // The appendChild() method appends a node as the last child of a node.
  todoDiv.appendChild(newTodo);

  //add todo  to localstorage
  saveLocalTodos(todoInput.value);

  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  // append to list
  todoList.appendChild(todoDiv);
  // clear todo input value
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;

  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    //animation
    todo.classList.add("fall");
    //remove todo from local storage
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    console.log(todos);
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  // CHECK if there is anything there
  let todos;
  // if we don't have, it will create an empty array
  if (localStorage.getItem("todos") === null) {
    todos = [];
    // if we do, then we  will already have an array from local storage
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  // when we have an array,we will push new todos to it
  todos.push(todo);
  // then set it back to the local storage
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todos");

    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  // remove the item at that index
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

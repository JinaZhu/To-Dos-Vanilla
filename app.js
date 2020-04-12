//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

//event listeners
todoButton.addEventListener("click", addTodo);

//functions
function addTodo(event) {
  // prevent form from submitting
  event.preventDefault();
  console.log("hello");
}

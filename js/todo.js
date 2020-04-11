// @Oritorius
// Oritorius.com

const todoForm = document.querySelector("#todoForm");
const todoInput = document.querySelector("#todoInput");
const todoList = document.querySelector(".list-group");
const todoClear = document.querySelector("#todoClear");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");

allEvents();

function allEvents() {
    todoForm.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadTodoUI);
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodo);
    todoClear.addEventListener("click", deleteAllTodo);
}

function addTodo(e) {
    const newTodo = todoInput.value.trim();
    if (newTodo === "") {
        showAlert("danger", "Alan boş bırakılamaz.");
    } else {
        addTodoStorage(newTodo);
        todoUI(newTodo);
    }
    e.preventDefault();
}

function deleteTodo(e) {
    if (e.target.className === "fa fa-times") {
        e.target.parentElement.parentElement.remove();
        deleteTodoStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success", "Başarıyla silindi.");
    }
}

function deleteAllTodo() {
    while (todoList.firstElementChild != null) {
        todoList.removeChild(todoList.firstElementChild);
    }
    localStorage.removeItem("todos");
    showAlert("success", "Tümü silindi.")
}

function filterTodo(e) {
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach((listItem) => {
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1) {
            listItem.setAttribute("style", "display:none!important");
        } else {
            listItem.setAttribute("style", "display:block");
        }
    });

}

function loadTodoUI() {
    let todos = getTodoStorage();
    todos.forEach((todo) => {
        todoUI(todo);
    })
}

function getTodoStorage() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodoStorage(newTodo) {
    let todos = getTodoStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteTodoStorage(delTodo) {
    let todos = getTodoStorage();

    todos.forEach(function(todo, index) {
        if (todo === delTodo) {
            todos.splice(index, 1);
        }
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}

function todoUI(newTodo) {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between";
    const listLink = document.createElement("a");
    listLink.href = "#";
    listLink.className = "delete-item";
    listLink.innerHTML = "<i class='fa fa-times'></i>";
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(listLink);
    todoList.appendChild(listItem);
    todoInput.value = "";
}

function showAlert(type, message) {
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    firstCardBody.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 1000);
}
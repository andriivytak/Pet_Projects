const todoList = document.querySelector('.todo__list');
const input = document.querySelector('.todo__input');
const buttonAdd = document.querySelector('.todo__button-add');
const deleteButton = document.querySelectorAll('.todo__delete');
const deleteAllButton = document.querySelector('.footer__button');


const pendingTasks = document.querySelector('.footer__pending');

//Event listeners

input.addEventListener('input', textLengthCheck);
buttonAdd.addEventListener('click', addNewTask);
todoList.addEventListener('click', completeTheTask);
todoList.addEventListener('click', deleteCheck);
deleteAllButton.addEventListener('click', deleteAll);
document.addEventListener('DOMContentLoaded', getTodos);
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addNewTask();
    }
});


function textLengthCheck() {
    const userData = input.value;
    if (userData.trim() == 0) {
        buttonAdd.classList.remove('active');
    } else {
        buttonAdd.classList.add('active');
    }
}


function addNewTask() {

    const userData = input.value;
    const todoItem = document.createElement('li');
    todoItem.classList.add('todo__list-item');
    todoItem.innerText = userData;
    saveToLocalStorage(userData);
    const span = document.createElement('span');
    span.classList.add('todo__delete');
    const i = document.createElement('i');
    i.classList.add('fas', 'fa-trash');

    todoList.append(todoItem);
    todoItem.append(span);
    span.append(i);
    input.value = '';
    textLengthCheck();
    countOfPendingTasks();

}


function completeTheTask(e) {

    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('completed');
    }
    countOfPendingTasks();
}


function deleteCheck(e) {
    const target = e.target;

    if (target.classList[0] == 'todo__delete') {
        const todo = target.parentElement;
        todo.classList.add('fall');
        removeFromLocalStorage(todo);
        todo.addEventListener('transitionend', () => {
            todo.remove();
        });

    }
    countOfPendingTasks();

}

function deleteAll() {
    todoList.innerHTML = '';
    countOfPendingTasks();
    localStorage.clear();
}


function countOfPendingTasks() {
    let sum = 0;
    let pendingArr = todoList.children;
    for (let item of pendingArr) {
        if (item.className === 'todo__list-item') {
            sum += 1;
        }
    }
    pendingTasks.innerHTML = `You have ${sum} pending tasks`;
}


function saveToLocalStorage(todo) {
    let itemOfStorage = localStorage.getItem('todo');
    let arrList;
    if (itemOfStorage == null) {
        arrList = [];
    } else {
        arrList = JSON.parse(itemOfStorage);
    }
    arrList.push(todo);
    localStorage.setItem('todo', JSON.stringify(arrList));


}

function removeFromLocalStorage(todo) {
    let itemOfStorage = localStorage.getItem('todo');
    let arrList;
    if (itemOfStorage == null) {
        arrList = [];
    } else {
        arrList = JSON.parse(itemOfStorage);

    }

    let todoIndex = todo.innerText;
    arrList.splice(arrList.indexOf(todoIndex), 1);
    localStorage.setItem('todo', JSON.stringify(arrList));

}

function getTodos() {
    let itemOfStorage = localStorage.getItem('todo');
    let arrList;
    if (itemOfStorage == null) {
        arrList = [];
    } else {
        arrList = JSON.parse(itemOfStorage);

    }

    arrList.forEach(item => {
        const todoItem = document.createElement('li');
        todoItem.classList.add('todo__list-item');
        todoItem.innerText = item;
        const span = document.createElement('span');
        span.classList.add('todo__delete');
        const i = document.createElement('i');
        i.classList.add('fas', 'fa-trash');

        todoList.append(todoItem);
        todoItem.append(span);
        span.append(i);
    });

    countOfPendingTasks();
}







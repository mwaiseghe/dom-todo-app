let todoForm = document.querySelector('.todoForm');
let todoInput = document.querySelector('#todoInput');
let items = document.querySelector('.items');
let itemsLeft = document.querySelector('.items-left');
let taskStatus = document.querySelector('.task-status');
let clear = document.querySelector('.clear');
let ifChecked = document.querySelector('#ifChecked');


let todoList = localStorage.getItem('todoList') ? JSON.parse(localStorage.getItem('todoList')) : [];

let id = localStorage.getItem('id') ? JSON.parse(localStorage.getItem('id')) : 0;


todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if(todoInput.value !== '') {
    let ifChecked = document.querySelector('#ifChecked');
    console.log(ifChecked.checked);
    if(ifChecked.checked) {
      todoList.push({
        id: id,
        name: todoInput.value,
        completed: true
      });
    } else {
      todoList.push({
        id: id,
        name: todoInput.value,
        completed: false
      });
    }
    id++;
    localStorage.setItem('todoList', JSON.stringify(todoList));
    todoInput.value = '';
  }
  todoForm.reset();
  displayTodo();
});

function displayTodo() {
  stored_items = localStorage.getItem('todoList');
  items.innerHTML = '';
  todoList = JSON.parse(stored_items);
  if (todoList.length === 0) {
    todoList = [];
  }

  
  todoList.forEach((item) => {
    let checked = item.completed ? 'checked' : null;
    if (item.completed) {
      items.innerHTML += `
      <div class="single-item">
        <input type="checkbox" name="" id="${item.id}" ${checked}>
        <p class="completed item-p">${item.name}</p>
        <img src="./images/icon-cross.svg" alt="" id="${item.id}">
      </div>
      `;
    } else {
      items.innerHTML += `
      <div class="single-item">
        <input type="checkbox" name="" id="${item.id}" ${checked}>
        <p class="item-p">${item.name}</p>
        <img src="./images/icon-cross.svg" alt="" id="${item.id}">
      </div>
      `;
    }
  });
  getItemsLeft();
}


items.addEventListener('click', (e) => {
  if (e.target.type === 'checkbox') {
    toggle(e.target.id);
    if (e.target.nextElementSibling.classList.contains('completed')) {
        e.target.nextElementSibling.classList.remove('completed');
        getItemsLeft()
    } else {
      e.target.nextElementSibling.classList.add('completed');
      getItemsLeft()
    }
  }
  if (e.target.tagName === 'IMG') {
    deleteItem(e.target.id);
  }
});


function toggle(id) {
  todoList.map((item) => {
    if (item.id == id) {
      item.completed = !item.completed;
    }
    getItemsLeft()
    return item;
  });
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

function displayActive() {
  stored_items = localStorage.getItem('todoList');
  items.innerHTML = '';
  todoList = JSON.parse(stored_items);
  todoList.forEach((item) => {
    if (!item.completed) {
      items.innerHTML += `
      <div class="single-item">
        <input type="checkbox" name="" id="${item.id}">
        <p class="item-p">${item.name}</p>
        <img src="./images/icon-cross.svg" alt="" id="${item.id}">
      </div>
      `;
    }
  });
  getItemsLeft()
}


function displayCompleted() {
  stored_items = localStorage.getItem('todoList');
  items.innerHTML = '';
  todoList = JSON.parse(stored_items);
  todoList.forEach((item) => {
    if (item.completed) {
      items.innerHTML += `
      <div class="single-item">
        <input type="checkbox" name="" id="${item.id}" checked>
        <p class="completed item-p">${item.name}</p>
        <img src="./images/icon-cross.svg" alt="" id="${item.id}">
      </div>
      `;
    }
  });
  getItemsLeft();
}

if (todoList.length === 0) {
  todoList = [];
}else {
  displayTodo();
}

let clearCompleted = document.querySelector('.clear');
clearCompleted.addEventListener('click', () => {
  todoList = todoList.filter((item) => {
    return !item.completed;
  });
  localStorage.setItem('todoList', JSON.stringify(todoList));
  displayTodo();
});

let filterCompleted = document.querySelector('.completed-bottom');
filterCompleted.addEventListener('click', () => {
  displayCompleted();
});

let displayAll = document.querySelector('.all-bottom');
displayAll.addEventListener('click', () => {
  displayTodo();
});

let displayActiveBtn = document.querySelector('.all-active');
displayActiveBtn.addEventListener('click', () => {
  displayActive();
});

function deleteItem(id) {
  todoList = todoList.filter((item) => {
    return item.id != id;
  });
  localStorage.setItem('todoList', JSON.stringify(todoList));
  displayTodo();
}

let mainCard = document.querySelector('.main-card');
mainCard.addEventListener('dragover', (e) => {
  e.preventDefault();
}
);

mainCard.addEventListener('drop', (e) => {
  e.preventDefault();
  deleteItem(e.dataTransfer.getData('text'));
}

);

function getItemsLeft() {
  let itemsLeft = document.querySelector('.items-left');
  let count = 0;
  todoList.forEach((item) => {
    if (!item.completed) {
      count++;
    }
  });
  itemsLeft.innerHTML = `
  <p><span class="smaller">
    ${count} items left
  </span></p>
  `;
}

let mode_changer = document.querySelector('#change_mode');
let main_container = document.querySelector('body');

function changeMode(){
  if (main_container.classList.contains('dark-mode')){
    main_container.classList.remove('dark-mode');
    mode_changer.classList.remove('dark-mode');
    mode_changer.src = './images/icon-moon.svg';
  }else{
    main_container.classList.add('dark-mode');
    mode_changer.classList.add('dark-mode');
    mode_changer.src ='./images/icon-sun.svg';
}
}

mode_changer.addEventListener('click', changeMode);




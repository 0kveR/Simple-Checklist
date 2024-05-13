class TaskObject {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }
}

function saveData() {
  var list = document.querySelector('#taskList');
  localStorage.setItem('data', list.innerHTML);
}

function loadData(task) {
  var list = document.querySelector('#taskList');
  var data = localStorage.getItem('data');
  list.innerHTML = data;
}

function addTask() {
  var taskName = document.querySelector('#taskName').value;
  var taskDescription = document.querySelector('#taskDescription').value;
  if (taskName === "")
    alert('Please add a task name!');
  else {
    if (taskDescription === "")
      taskDescription = "No description provided.";
    const newTask = new TaskObject(taskName, taskDescription);
    addTaskToList(newTask);
  }
}

function removeTask(button) {
  var parentNode = button.parentNode;
  parentNode.remove();
  saveData();
}

function addTaskToList(task) {
  // Get the div that contains all the tasks
  var list = document.querySelector('#taskList');

  // Create the elements that describe the new task
  var taskMain = document.createElement('div');
  taskMain.className = "taskMain";
  var checkBox = document.createElement('input');
  checkBox.type = "checkbox";
  // checkBox.onclick = "event.stopPropagation();markTaskComplete(this);";
  var span = document.createElement('span');
  span.innerHTML = task.name;
  span.className = "taskTitle";
  var taskContent = document.createElement('div')
  taskContent.className = "taskContent";
  taskContent.innerHTML = task.description;
  var deleteBtn = document.createElement('div');
  deleteBtn.className = "deleteBtn";
  deleteBtn.innerHTML = 'X';
  
  // Add listeners to checkbox
  checkBox.addEventListener('change', function() {
    markTaskComplete(this);
  });
  checkBox.addEventListener('click', function() {
    event.stopPropagation();
  });

  // Add listeners to delete button
  deleteBtn.addEventListener('click', function() {
    removeTask(this);
  });

  // Add all elements to taskMain div
  taskMain.appendChild(checkBox);
  taskMain.appendChild(span);
  taskMain.appendChild(deleteBtn);
  taskMain.appendChild(taskContent);

  //Add Listener to Task
  taskMain.addEventListener("click", function() {
    this.classList.toggle("active");
    
    var content = this.querySelector(".taskContent");

    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });

  // Add task to list
  list.appendChild(taskMain);
  saveData();
}

function markTaskComplete(button) {
  console.log(button.checked);
  var div = button.parentNode;

  if (button.checked === true) {
    div.style.textDecoration = 'line-through';
    div.style.color = "hsl(0 0% 0% / 50%)";
  }
  else {
    div.style.textDecoration = 'none';
    div.style.color = "black";
  }
  saveData();
}

loadData()

var allTaskElements = document.getElementsByClassName("taskMain");
var i;

for (i = 0; i < allTaskElements.length; i++) {
  allTaskElements[i].addEventListener("click", function() {
    this.classList.toggle("active");
    
    var content = this.querySelector(".taskContent");

    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}

var delBtns = document.getElementsByClassName("deleteBtn");

for (i = 0; i < delBtns.length; i++) {
  delBtns[i].addEventListener("click", function() {
    removeTask(this);
  });
}

/* 
When do we change the data?
1. When we add a new task
2. When we remove a task
3. When we mark a task as completed/incomplete

We also need to retrieve data when we load in.
*/
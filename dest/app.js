const addbtn = document.getElementById("addbtn");
const updatebtn = document.getElementById("updatebtn");
const editbtn = document.getElementById("editbtn");
const deletebtn = document.getElementById("deletebtn");
const title = document.getElementById("title");
const description = document.getElementById("description");
const date = document.getElementById("date");
const form = document.getElementById("form");
const taskList = document.getElementById("taskList");
class incompletedTodos {
    // protected tasksarr: todo[] = [];
    constructor() {
        this.tasksarr = [];
    }
    addTask(todoitem) {
        this.tasksarr.push(todoitem);
    }
    getOneTask(todoid) {
        return this.tasksarr.find((task) => task.id === todoid);
        // return this.tasksarr[todoid];
    }
    getAllTasks() {
        return this.tasksarr;
    }
    editTask(todo, todoitem) {
        Object.assign(todo, todoitem);
    }
    deleteTask(todoid) {
        return this.tasksarr.splice(todoid, 1);
    }
}
class completedTodos extends incompletedTodos {
    constructor() {
        super();
        this.completedTasksArr = [];
    }
    completeTask(todoitem) {
        this.completedTasksArr.push(todoitem);
    }
    getCompleteTask() {
        return this.completeTask;
    }
}
// const IncompletedTodos = new incompletedTodos();
// const CompletedTodos = new completedTodos();
const task = new incompletedTodos();
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let todoitem = {
        title: title.value,
        description: description.value,
        date: date.value,
        completed: false,
    };
    title.value = "";
    description.value = "";
    date.value = "";
    task.addTask(todoitem);
    renderTasks();
});
function renderTasks() {
    const IncompletedTodosMarkup = task.getAllTasks()
        .map((todoitem, index) => `
      <div id="task" class="task">
        <div class="title">${todoitem.title}</div>
        <div class="description">${todoitem.description}</div>
        <div class="duedate">${todoitem.date}</div>

        <div class="actions">
          <button id="markbtn">complete</button>
          <button  onclick= editTask(${index}) id="editbtn" >EDIT</button>
          <button onclick= ${deleteTask(index)} id="deletebtn">DELETE</button>
        </div>
      </div>
    `)
        .join("");
    taskList.innerHTML = IncompletedTodosMarkup;
}
const deleteTask = (indexT) => {
    task.deleteTask(indexT);
    renderTasks();
};
const editTask = (todoid) => {
    const tasks = task.getAllTasks()[todoid];
    title.value = tasks.title;
    description.value = tasks.description;
    date.value = tasks.date;
    addbtn.style.display = "none";
    updatebtn.style.display = "block";
    const clickHandler = () => {
        tasks.title = title.value;
        tasks.description = description.value;
        tasks.date = date.value;
        title.value = "";
        description.value = "";
        date.value = "";
        addbtn.style.display = "block";
        updatebtn.style.display = "none";
        updatebtn.removeEventListener('click', clickHandler);
        renderTasks();
    };
    updatebtn.addEventListener("click", clickHandler);
};
// addbtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   let todoitem: todo = {
//     title: title.value,
//     description: description.value,
//     date: date.value,
//     completed: false,
//   };
//   IncompletedTodos.addTask(todoitem);
//   renderTasks();
// });
// function editTask(taskIndex: number) {
//   let todoitem = IncompletedTodos.getOneTask(taskIndex);
//   title.value = todoitem.title;
//   description.value = todoitem.description;
//   date.value = todoitem.date;
//   IncompletedTodos.editTask(todoitem, {
//     title: title.value,
//     description: description.value,
//     date: date.value,
//   });
// }
// function renderTasks() {
//   const IncompletedTodosMarkup = IncompletedTodos.getAllTasks()
//     .map(
//       (todoitem, index) => `
//       <div id="task" class="task">
//         <div class="title">${todoitem.title}</div>
//         <div class="description">${todoitem.description}</div>
//         <div class="duedate">${todoitem.date}</div>
//         <div class="actions">
//           <button id="markbtn">complete</button>
//           <button id="editbtn">EDIT</button>
//           <button onclick="deleteTask(${index}) id="deletebtn">DELETE</button>
//         </div>
//       </div>
//     `
//     )
//     .join("");
//   taskList.innerHTML = IncompletedTodosMarkup;
// }

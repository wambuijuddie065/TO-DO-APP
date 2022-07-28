const addbtn = document.getElementById("addbtn") as HTMLButtonElement;
const updatebtn = document.getElementById("updatebtn") as HTMLButtonElement;
const editbtn = document.getElementById("editbtn") as HTMLButtonElement;
const deletebtn = document.getElementById("deletebtn") as HTMLButtonElement;
const title = document.getElementById("title") as HTMLInputElement;
const description = document.getElementById("description") as HTMLInputElement;
const date = document.getElementById("date") as HTMLInputElement;
const form = document.getElementById("form") as HTMLFormElement;
const taskList = document.getElementById("taskList");

interface todo {
  title: string;
  description: string;
  date: string;
  completed?: boolean;
}

class incompletedTodos {
  private tasksarr: todo[] = [];
  // protected tasksarr: todo[] = [];

  constructor() {}

  addTask(todoitem: todo) {
    this.tasksarr.push(todoitem);
  }

  getOneTask(todoid: number) {
    return this.tasksarr.find((task:any) => task.id === todoid);
    // return this.tasksarr[todoid];
  }

  getAllTasks() {
    return this.tasksarr;
  }

  editTask(todo: todo, todoitem: todo) {
    Object.assign(todo, todoitem);
  }

  deleteTask(todoid: number) {
     return this.tasksarr.splice(todoid, 1);
    
  }
}

class completedTodos extends incompletedTodos {
  public completedTasksArr:todo[] = [];
  constructor() {
    super();
  }

  completeTask(todoitem: todo) {
    this.completedTasksArr.push(todoitem);
  }

  getCompleteTask() {
    return this.completeTask;
  }

  // getAllTasks() {
  //   return this.tasksarr.filter((todoitem: todo) => !!todoitem.completed);
  // }
}

// const IncompletedTodos = new incompletedTodos();
// const CompletedTodos = new completedTodos();

const task= new incompletedTodos();
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let todoitem: todo = {
    title: title.value,
    description: description.value,
    date: date.value,
    completed: false,
  };
  title.value ="";
  description.value ="";
  date.value = "";


  task.addTask(todoitem);
  renderTasks();
});









function renderTasks() {
  const IncompletedTodosMarkup = task.getAllTasks()
    .map(
      (todoitem, index) => `
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
    `
    )
    .join("");

  taskList.innerHTML = IncompletedTodosMarkup;
}



const deleteTask= (indexT)=>{
  task.deleteTask(indexT);
  renderTasks();}


const editTask = (todoid:number) => {
  const tasks = task.getAllTasks()[todoid];
  title.value = tasks.title;
  description.value = tasks.description;
  date.value = tasks.date;
  addbtn.style.display = "none";
  updatebtn.style.display = "block";

  const clickHandler = () => {
    tasks.title =title.value;
    tasks.description = description.value;
    tasks.date = date.value;
    title.value = "";
    description.value = "";
    date.value = "";
    addbtn.style.display = "block";
    updatebtn.style.display = "none";
    updatebtn.removeEventListener('click', clickHandler)
    renderTasks();
  }
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

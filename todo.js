const todoForm = document.querySelector(".todoForm"),
todoInput = todoForm.querySelector("input"),
todolist = document.querySelector(".todolist"),
finishedlist = document.querySelector(".finishedlist");
const todoAll = document.querySelectorAll(".todo");
const UN = document.querySelector(".username")

const todo_LS = "todo",
finished_LS = "finished";
let todo = [],
finished = [];

function save(num){
  if (num === 0) {
    localStorage.setItem(todo_LS, JSON.stringify(todo))
  }else {
    localStorage.setItem(finished_LS, JSON.stringify(finished))
  }
}
function handle(event){
  event.preventDefault()
  const value=todoInput.value
  paint(value,0)
  todoInput.value =""
}
function deltodo(event){
  const btn = event.target
  const li = btn.parentNode
  const list = li.parentNode
  list.removeChild(li)
  if (list.className==="todolist") {
    const cleanTodos = todo.filter(function(toDo){
      return toDo.id !== parseInt(li.id, 10);
    })
    todo = cleanTodos
    save(0)
  }else{
    const cleanTodos = finished.filter(function(toDo){
      return toDo.id !== parseInt(li.id, 10) ;
    })
    finished = cleanTodos
    save(1)
  }

}

function checktodo(event){
  const btn = event.target
  const li = btn.parentNode
  const list = li.parentNode
  if (list.className==="todolist") {
    btn.innerText ="◀️"
    finishedlist.appendChild(li)
      const cleanTodos = todo.filter(function(toDo){
        return toDo.id !== parseInt(li.id, 10);
      })
      const finishS = todo.filter(function(toDo){
        return toDo.id === parseInt(li.id, 10);
      })
      todo = cleanTodos
      finished.push(finishS[0])
      save(1)
      save(0)
  }else{
    btn.innerText ="✔️"
    todolist.appendChild(li)
    const cleanTodos = finished.filter(function(toDo){
      return toDo.id !== parseInt(li.id);
    })
    const todoS = finished.filter(function(toDo){
      return toDo.id === parseInt(li.id);
    })
    finished = cleanTodos
    todo.push(todoS[0])
    save(1)
    save(0)
  }
}

function paint(text, num){
  const delBtn = document.createElement("button")
  const li = document.createElement("li")
  const span = document.createElement("span")
  const checkBtn = document.createElement("button")
  delBtn.innerText = "❌"
  if (num === 0) {
    const newID = todo.length+1
    checkBtn.innerText = "✔️"
    span.innerText = text
    li.id = newID
    const todoObj = {
      text : text,
      id : newID
    }
    todo.push(todoObj)
    li.appendChild(span)
    li.appendChild(checkBtn)
    li.appendChild(delBtn)
    todolist.appendChild(li)
    save(0)
  }else {
    const newID = finished.length+1
    checkBtn.innerText = "◀️"
    span.innerText = text
    li.id = newID
    const finishedObj ={
      text : text,
      id : newID
    }
    finished.push(finishedObj)
    li.appendChild(span)
    li.appendChild(checkBtn)
    li.appendChild(delBtn)
    finishedlist.appendChild(li)
    save(1)
  }
  delBtn.addEventListener("click",deltodo)
  checkBtn.addEventListener("click",checktodo)
}

function loadTodo(){
  const todo_ =localStorage.getItem(todo_LS)
  if(todo_ !==null){
    const parsedToDos = JSON.parse(todo_)
    parsedToDos.forEach(function(element){
      paint(element.text, 0)
    })
  }
  const finished_ = localStorage.getItem(finished_LS)
  if (finished_ !== null) {
      const parsedfinished = JSON.parse(finished_)
      parsedfinished.forEach(function(element){
        paint(element.text, 1)
        })
      }
  }



function init(){
  todoAll.forEach(function(element){
    element.classList.remove("todo")
  })
  loadTodo()
  todoForm.addEventListener("submit", handle)
}

function load(){
  const id = localStorage.getItem("currentName")
  if (id===null) {
    UN.addEventListener("submit", init)
  }
  else {
    init()
  }
}
load()

const form = document.querySelector(".username"),
input = form.querySelector(".name");
const Name_LS = "currentName";

function handleSubmit(event){
  event.preventDefault();
  localStorage.setItem(Name_LS, input.value);
  paintName(input.value);

}

function paintName(element){
  const greeting = document.createElement("h1")
  form.removeChild(input)
  form.appendChild(greeting)
  greeting.innerText = `${element}님 반갑습니다.`
}

function loadName(){
  const currentName = localStorage.getItem(Name_LS)
  if(currentName === null){
    form.addEventListener("submit",handleSubmit)
  }else {
    paintName(currentName)
  }
}

function init(){
  loadName()
}

init()

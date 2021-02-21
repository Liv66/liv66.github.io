const body = document.querySelector("body");
const username = document.querySelector(".username");
const IMG_NUMBER = 10;
const image = new Image();
let a = 0,
imgNumber = Math.floor(Math.random()*IMG_NUMBER);

function changeImg(){
  a = imgNumber
  body.removeChild(image)
  paintImage()
}

function paintImage(){
  while (imgNumber === a) {
    imgNumber = Math.floor(Math.random()*IMG_NUMBER);
  }
  image.src=`images/${imgNumber + 1}.jpg`
  image.classList.add("bgImage")
  body.prepend(image);
}


function init(){
  paintImage()
  setInterval(changeImg,15000)
}

function load(){
  image.src = `C:/Users/TaeHeonKim/Desktop/김정헌/web/졸업과제/images/back.jpg`
  image.classList.add("bgImage")
  body.prepend(image);
  const id = localStorage.getItem("currentName")
  if (id===null) {
    username.addEventListener("submit", init)
  }
  else {
    init()
  }
}
load()

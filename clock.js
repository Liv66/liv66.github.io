const clock = document.getElementById("clock");
const DATE = document.getElementById("date");
function day_(day){

  if(day===0){
    day ="일"
  } else if (day===1) {
    day  ="월"
  }else if (day===2) {day = "화"

}else if (day===3) {day = "수"

  }else if (day===4) {
    day = "목"
  }else if (day===5) {day = "금"

}else if (day===6) {day = "토"

  }
  return day

}
function clockhandle(){
  const date = new Date(),
   year = date.getFullYear(),
   month = date.getMonth(),
   date_ = date.getDate(),
   day = date.getDay(),
   hours = date.getHours(),
   minutes = date.getMinutes(),
   seconds = date.getSeconds();
  DATE.innerText = `${year}년 ${month+1}월 ${date_}일 ${day_(day)}요일`
  clock.innerText= `${hours<10 ? `0${hours}` : hours}:${minutes<10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}`: seconds}`;

}
function init(){
  clockhandle()
  setInterval(clockhandle,1000)
}
init()

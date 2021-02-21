const API_KEY = "fbdec9018862fc9001d6e991589448ac"
const COORDS = 'coords'
const weather = document.querySelector(".js-weather")
function saveCoords(coordsObj){
  localStorage.setItem(COORDS, JSON.stringify(coordsObj))
}

function getWeather(lat, lon){
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`).then(
    function(response){ return response.json() } ).then(function(json){
    const temperature = json.main.temp;
    const place = json.name;
    weather.innerText = ` ${place}
    ${temperature}°C`
  })
}

function handleGeoSucces(position){
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj)
  getWeather(latitude,longitude)
}

function handleGeoError(){
  console.log("cant access geo locatio")
}

function askForCoords(){
  navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError)
}

function loadCoords(){
  const loadedCords = localStorage.getItem(COORDS)
  if (loadedCords === null) {
    askForCoords();
  }else {
    const parsedCoords = JSON.parse(loadedCords);
    getWeather(parsedCoords.latitude,parsedCoords.longitude);
  }
}
function init(){
  loadCoords();
}
init()

const weather = document.querySelector(".js-weather");

const COORDS = 'coords';

const API_KEY = "6b46865b80b9c12ecbda4051286b94c0";

function getWeather(lat, lng) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metrics`
    ).then(function(response) {
        return response.json()
    }).then(function(json) {
        console.log(json);
        const temp = json.main.temp;
        const place = json.name;
        weather.innerText = temp + '@' + place;
    })
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude: latitude,
        longitude: longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("no access geo location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadCoords = localStorage.getItem(COORDS);

    if(loadCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();
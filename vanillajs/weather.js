const weather = document.querySelector(".js-weather");

const COORDS = 'coords';

const API_KEY = "6b46865b80b9c12ecbda4051286b94c0";

// 날씨정보 get
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

// 현재위치 정보 success callback 함수
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

// 현재위치 정보 error callback 함수
function handleGeoError() {
    console.log("no access geo location");
}

function askForCoords() {
    // 현재위치 가져오기(successCallback, errorCallback)
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    // 현재 위치 정보
    const loadCoords = localStorage.getItem(COORDS);

    if(loadCoords === null) {
        // 위치정보 묻기
        askForCoords();
    } else {
        // 날씨정보 get
        const parseCoords = JSON.parse(loadCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();
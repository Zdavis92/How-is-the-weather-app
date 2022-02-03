var lat = ""
var lon = ""
var cityName = ""
var cityNameEl = document.querySelector("#searchBox")
var buttonEl = document.querySelector("#searchBtn");

var search = function(event) {
    cityName = cityNameEl.value
    console.log(cityName)
    getCityLatLon(cityName);
}

var getCityLatLon = function(cityName) {
    if (cityName) {
        var apiCity = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=7c0bd0cf3800dbf86808087317e3514f"
        fetch(apiCity).then(function(response) {
            response.json().then(function(data){
                console.log(data);
                lat = data[0].lat
                lon = data[0].lon
                console.log(lat);
                console.log(lon);
                getWeatherData(lat, lon);
            })
        })
    }
    else {
        alert("Enter a City Name")
    }
}

var getWeatherData = function(lat, lon) {
    var apiLatLon = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=minutely,hourly,alerts&appid=7c0bd0cf3800dbf86808087317e3514f"
    fetch(apiLatLon).then(function(response) {
        response.json().then(function(data) {
            console.log(data)
        })
    })
}
buttonEl.addEventListener("click", search)

var lat = ""
var lon = ""
var cityName = ""
var date = moment().format("MM DD YYYY");
var cityNameEl = document.querySelector("#searchBox")
var buttonEl = document.querySelector("#searchBtn");
var currentCon = {
    temp: "",
    wind: "",
    humidity: "",
    UVIndex: ""
}
var daysArr = [
    day1 = {
    date: "",
    temp: "",
    wind: "",
    humidity: ""
},
    day2 = {
    date: "",
    temp: "",
    wind: "",
    humidity: ""
},
    day3 = {
    date: "",
    temp: "",
    wind: "",
    humidity: ""
},
    day4 = {
    date: "",
    temp: "",
    wind: "",
    humidity: ""
},
    day5 = {
    date: "",
    temp: "",
    wind: "",
    humidity: ""
}]

var search = function(event) {
    cityName = cityNameEl.value
    cityNameEl.value = ""
    getCityLatLon(cityName);
}

var getCityLatLon = function(cityName) {
    if (cityName) {
        var apiCity = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=7c0bd0cf3800dbf86808087317e3514f"
        fetch(apiCity).then(function(response) {
            response.json().then(function(data){
                lat = data[0].lat
                lon = data[0].lon
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
            currentCon.temp = data.current.temp
            currentCon.wind = data.current.wind_speed
            currentCon.humidity = data.current.humidity
            currentCon.UVIndex = data.current.uvi
            for (i = 0; i < daysArr.length; i++) {
                daysArr[i].date = moment().add(i+1, 'days').format("MM DD YYYY")
                daysArr[i].temp = data.daily[i].temp.day
                daysArr[i].wind = data.daily[i].wind_speed
                daysArr[i].humidity = data.daily[i].humidity
            }
            console.log(daysArr);
        })
    })
}

var displyWeather = function() {

}
buttonEl.addEventListener("click", search)
console.log(date);
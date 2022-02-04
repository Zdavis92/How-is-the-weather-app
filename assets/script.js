var lat = ""
var lon = ""
var cityName = ""
var date = moment().format("MM/DD/YYYY");
var cityNameEl = document.querySelector("#searchBox")
var buttonEl = document.querySelector("#searchBtn");
var searchedCitiesContainer = document.querySelector("#searchedCities");
var savedCities = []
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

var search = function() {
    cityName = cityNameEl.value.toUpperCase();
    cityNameEl.value = ""
    savedCities.unshift(cityName)
    displySearchCities();
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
            currentCon.temp = data.current.temp
            currentCon.wind = data.current.wind_speed
            currentCon.humidity = data.current.humidity
            currentCon.UVIndex = data.current.uvi
            for (i = 0; i < daysArr.length; i++) {
                daysArr[i].date = moment().add(i+1, 'days').format("MM/DD/YYYY")
                daysArr[i].temp = data.daily[i].temp.day
                daysArr[i].wind = data.daily[i].wind_speed
                daysArr[i].humidity = data.daily[i].humidity
            }
            displyWeather();
        })
    })
}

var displyWeather = function() {
    var currentCityEl = document.querySelector("#currentCity");
    currentCityEl.innerHTML = ""
    var currentCityNameEl = document.createElement("h2");
    var currentCityTempEl = document.createElement("p");
    var currentCityWindEl = document.createElement("p");
    var currentCityHumidityEl = document.createElement("p");
    var currentCityUvEl = document.createElement("p");
    currentCityNameEl.textContent = cityName + " " + date;
    currentCityTempEl.textContent = "Temp: " + currentCon.temp + "°F";
    currentCityWindEl.textContent = "Wind: " + currentCon.wind + "MPH";
    currentCityHumidityEl.textContent = "Humidity: " + currentCon.humidity + "%";
    currentCityUvEl.textContent = "UV Index: " + currentCon.UVIndex;
    currentCityEl.appendChild(currentCityNameEl)
    currentCityEl.appendChild(currentCityTempEl)
    currentCityEl.appendChild(currentCityWindEl)
    currentCityEl.appendChild(currentCityHumidityEl)
    currentCityEl.appendChild(currentCityUvEl)
    var forecastContainer = document.querySelector("#forecast");
    forecastContainer.innerHTML = ""
    for (i = 0; i < daysArr.length; i++) {
        var colEl = document.createElement("div")
        colEl.classList.add("col", "card");
        var cardEl = document.createElement("div")
        cardEl.classList.add("card-body");
        var cardTitleEl = document.createElement("h5")
        cardTitleEl.classList.add("card-title");
        var tempEl = document.createElement("p")
        tempEl.classList.add("card-text");
        var windEl = document.createElement("p")
        windEl.classList.add("card-text");
        var humidityEl = document.createElement("p")
        humidityEl.classList.add("card-text");
        cardTitleEl.textContent = daysArr[i].date
        tempEl.textContent = "Temp: " + daysArr[i].temp
        windEl.textContent = "Wind: " + daysArr[i].wind
        humidityEl.textContent = "Humidity: " + daysArr[i].humidity
        forecastContainer.appendChild(colEl)
        colEl.appendChild(cardEl)
        cardEl.appendChild(cardTitleEl)
        cardEl.appendChild(tempEl)
        cardEl.appendChild(windEl)
        cardEl.appendChild(humidityEl)
    }
}

var displySearchCities = function () {
    searchedCitiesContainer.innerHTML = ""
    for (i = 0; i < 3; i++) {
        var savedCityEl = document.createElement("p");
        savedCityEl.textContent = savedCities[i];
        searchedCitiesContainer.appendChild(savedCityEl);
    }
}

var redisply = function(event) {
    if (event.target){
        cityNameEl.value = event.target.textContent;
    search();
    }
}
searchedCitiesContainer.addEventListener("click", redisply)
buttonEl.addEventListener("click", search)


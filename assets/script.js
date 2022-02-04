var lat = ""
var lon = ""
var cityName = ""
var date = moment().format("MM/DD/YYYY");
var cityNameEl = document.querySelector("#searchBox")
var buttonEl = document.querySelector("#searchBtn");
var searchedCitiesContainer = document.querySelector("#searchedCities");
var currentCityIconEl = document.createElement("img");
var currentCityUvEl = document.createElement("p");
var iconArr = ["01d", "01n", "02d", "02n", "03d", "03n", "04d", "04n", "09d", "09n", "10d", "10n", "11d", "11n", "13d", "13n", "50d", "50n"]
var savedCities = []
var currentCon = {
    icon: "",
    temp: "",
    wind: "",
    humidity: "",
    UVIndex: ""
}
var daysArr = [
    day1 = {
    date: "",
    icon: "",
    temp: "",
    wind: "",
    humidity: ""
},
    day2 = {
    date: "",
    icon: "",
    temp: "",
    wind: "",
    humidity: ""
},
    day3 = {
    date: "",
    icon: "",
    temp: "",
    wind: "",
    humidity: ""
},
    day4 = {
    date: "",
    icon: "",
    temp: "",
    wind: "",
    humidity: ""
},
    day5 = {
    date: "",
    icon: "",
    temp: "",
    wind: "",
    humidity: ""
}]
// takes city name in search bar and adds it to savedcities array and calls functions to show search cities, get the lat and lon of the searched city, and saves city to local storage.
var search = function() {
    cityName = cityNameEl.value.toUpperCase();
    cityNameEl.value = ""
    savedCities.unshift(cityName)
    displaySearchCities();
    getCityLatLon(cityName);
    saveCities(savedCities);
}
// function that saves the array of searched cities
var saveCities = function(savedCities) {
    localStorage.setItem("cities", JSON.stringify(savedCities));
}
// checks for saved cities in local storage and loads the saved array. Resets array if one isn't found
var loadCities = function() {
    if (JSON.parse(localStorage.getItem("cities") === null)) {
        savedCities = []
    }
    else {
        savedCities = JSON.parse(localStorage.getItem("cities"));
    };
}
// function fetchs api to get lat and lon of the searched city and calls function to get the weather data
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
// calls the api to weather data for current and forecast and saves the data in objects. Calls function to display the data
var getWeatherData = function(lat, lon) {
    var apiLatLon = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=minutely,hourly,alerts&appid=7c0bd0cf3800dbf86808087317e3514f"
    fetch(apiLatLon).then(function(response) {
        response.json().then(function(data) {
            currentCon.icon = data.current.weather[0].icon
            currentCon.temp = data.current.temp
            currentCon.wind = data.current.wind_speed
            currentCon.humidity = data.current.humidity
            currentCon.UVIndex = data.current.uvi
            for (i = 0; i < daysArr.length; i++) {
                daysArr[i].date = moment().add(i+1, 'days').format("MM/DD/YYYY")
                daysArr[i].icon = data.daily[i].weather[0].icon
                daysArr[i].temp = data.daily[i].temp.day
                daysArr[i].wind = data.daily[i].wind_speed
                daysArr[i].humidity = data.daily[i].humidity
            }
            displayWeather();
        })
    })
}
// function dynamicly creates elements and added weather data to them. Then displays them on the screen.
var displayWeather = function() {
    var currentCityEl = document.querySelector("#currentCity");
    currentCityEl.innerHTML = ""
    var currentCityNameEl = document.createElement("h2");
    var currentCityTempEl = document.createElement("p");
    var currentCityWindEl = document.createElement("p");
    var currentCityHumidityEl = document.createElement("p");
    currentCityNameEl.textContent = cityName + " " + date;
    currentCityTempEl.textContent = "Temp: " + currentCon.temp + "°F";
    currentCityWindEl.textContent = "Wind: " + currentCon.wind + "MPH";
    currentCityHumidityEl.textContent = "Humidity: " + currentCon.humidity + "%";
    currentCityUvEl.textContent = "UV Index: " + currentCon.UVIndex;
    currentCityEl.appendChild(currentCityNameEl)
    currentCityEl.appendChild(currentCityIconEl)
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
        var iconEl = document.createElement("img");
        var tempEl = document.createElement("p")
        tempEl.classList.add("card-text");
        var windEl = document.createElement("p")
        windEl.classList.add("card-text");
        var humidityEl = document.createElement("p")
        humidityEl.classList.add("card-text");
        cardTitleEl.textContent = daysArr[i].date
        cardTitleEl.appendChild(iconEl)
        tempEl.textContent = "Temp: " + daysArr[i].temp
        windEl.textContent = "Wind: " + daysArr[i].wind
        humidityEl.textContent = "Humidity: " + daysArr[i].humidity
        forecastContainer.appendChild(colEl)
        colEl.appendChild(cardEl)
        cardEl.appendChild(cardTitleEl)
        cardEl.appendChild(tempEl)
        cardEl.appendChild(windEl)
        cardEl.appendChild(humidityEl)
        for (y = 0; y < iconArr.length; y++) {
            if (daysArr[i].icon === iconArr[y]) {
                iconEl.setAttribute("src", "./assets/images/" +iconArr[y] + ".png")
            }
        }
    }
    getWeatherIcon();
    unIndex();
}
// This function displays previously searched cities in search history and updates it
var displaySearchCities = function () {
    searchedCitiesContainer.innerHTML = ""
    for (i = 0; i < 3; i++) {
        var savedCityEl = document.createElement("p");
        savedCityEl.textContent = savedCities[i];
        searchedCitiesContainer.appendChild(savedCityEl);
    }
}
// function recalls the search on cities in search history that are clicked
var redisplay = function(event) {
    if (event.target){
        cityNameEl.value = event.target.textContent;
    search();
    }
}
// assigns the weather icon that matches the code from the weather data
var getWeatherIcon = function() {
    for (i = 0; i < iconArr.length; i++) {
        if (currentCon.icon === iconArr[i]) {
            currentCityIconEl.setAttribute("src", "./assets/images/" +iconArr[i] + ".png")
        }
    }
}
// assigns class to UV idex based on the weather data
var unIndex = function() {
    if (parseInt(currentCon.UVIndex) > 8) {
        currentCityUvEl.classList.add("uvVeryHigh")
    }
    else if (parseInt(currentCon.UVIndex) > 6) {
        currentCityUvEl.classList.add("uvHigh")
    }
    else if (parseInt(currentCon.UVIndex) > 3) {
        currentCityUvEl.classList.add("uvModerate")
    }
    else {
        currentCityUvEl.classList.add("uvLow")
    }
}
// call for the saved cities and for them to display
loadCities();
displaySearchCities();
searchedCitiesContainer.addEventListener("click", redisplay)
buttonEl.addEventListener("click", search)


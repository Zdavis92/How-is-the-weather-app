var lat = ""
var lon = ""
var cityName = ""
var apiCity = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=7c0bd0cf3800dbf86808087317e3514f"
var apiLatLon = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&appid=7c0bd0cf3800dbf86808087317e3514f"
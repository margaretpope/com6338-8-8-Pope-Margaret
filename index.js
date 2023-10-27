var userQuery = document.querySelector('input').value
var weatherDiv = document.getElementById('weather-app')
var weatherSec = document.getElementById('weather')
var current = document.createElement('p')
var feelsLike = document.createElement('p')
var lastUpdated = document.createElement('p')
var form = document.querySelector('form')
var weatherURL = 'https://api.openweathermap.org/data/2.5/weather'
var queryString = '?units=imperial&appid=4bce37d7d095cd3a1b9c4e53168315ad&q=' + userQuery
var URL = weatherURL + queryString

form.onsubmit = function(e) {
    e.preventDefault()
    fetch(URL)
    .then(function(res) {
        return res.json()
      })
}
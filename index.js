var weatherSec = document.getElementById('weather')
var city = document.createElement('h2')
var current = document.createElement('p')
var feelsLike = document.createElement('p')
var lastUpdated = document.createElement('p')
var form = document.querySelector('form')


form.onsubmit = function(e) {
    e.preventDefault()
    var userQuery = this.search.value.trim()
    var weatherURL = 'https://api.openweathermap.org/data/2.5/weather'
    var queryString = '?units=imperial&appid=4bce37d7d095cd3a1b9c4e53168315ad&q=' + userQuery
    var URL = weatherURL + queryString
    weatherSec.innerHTML = ''
    form.search.value = ''
    fetch(URL)
    .then(function(res) {
        if (res.status === 404) {
            throw new Error('Location not found')
        }
        return res.json()
      })
    .then(function(weather) {
        var country = weather.sys.country
        weatherSec.appendChild(city)
        city.textContent = userQuery + ', ' + country
        city.style.textTransform = 'capitalize'

        var lat = weather.coord.lat
        var lon = weather.coord.lon
        var mapsQuery = lat + ',' + lon
        var googleMaps = document.createElement('a')
        var link = document.createTextNode('Click to view map')
        googleMaps.appendChild(link)
        googleMaps.title = 'Click to view map'
        googleMaps.href = 'https://www.google.com/maps/search/?api=1&query=' + mapsQuery
        weatherSec.appendChild(googleMaps)
   
        var img = document.createElement('img')
        var iconCode = weather.weather[0].icon
        img.src = 'https://openweathermap.org/img/wn/' + iconCode + '@2x.png'
        img.alt = 'conditions icon'
        weatherSec.appendChild(img)

        var description = document.createElement('p')
        description.textContent = weather.weather[0].description
        description.style.textTransform = 'capitalize'
        weatherSec.appendChild(description)

        weatherSec.appendChild(current)
        current.textContent = 'Current: ' + weather.main.temp + '\xB0 F'

        weatherSec.appendChild(feelsLike)
        feelsLike.textContent = 'Feels like: ' + weather.main.feels_like + '\xB0 F'

        weatherSec.appendChild(lastUpdated)
        var date = new Date(weather.dt * 1000)
        var timeString = date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit'
        })
        lastUpdated.textContent = 'Last Updated: ' + timeString
    })
    .catch(function(err) {
        weatherSec.innerHTML = err.message
      })
}
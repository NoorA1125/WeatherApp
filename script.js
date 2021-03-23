/* *** Criteria for the project***
weather dashboard with form inputs
search for a city
    resented with current 
    and future conditions for that city 
    and that city is added to the search history


current weather conditions for that city
presented with the city name, the date, an icon representation of weather
conditions, the temperature, the humidity, the wind speed, and the UV index

UV index
    color that indicates whether the conditions are favorable, moderate, or severe

future weather conditions
5-day forecast that displays the date, 
an icon representation of weather conditions, 
the temperature, 
and the humidity

click on a city in the search history
again presented with current and future conditions for that city
*/

var api_key = "48ecd08b6bb6fbb7907ac16ed1599f7f";
var city = "";
var cityArray = [];
var citySearches = [];
var searchButton = document.querySelector("#primary-btn");
var searchCity = document.querySelector("#searchCity");
var currentCity = document.querySelector("#currentCity");
var clearButton = document.querySelector("#clearAll");
var temp = document.querySelector("#temp");
var humidity = document.querySelector("#humi");
var windSpeed = document.querySelector("#wind");
var uvIndex = document.querySelector("#uvin");
var forecastDiv = document.querySelector("#weekly-forcast")

//1) search for a city to see if it exists
function findCity(c) {
    for (let i = 0; i < cityArray.length; i++) {
        if (c.toUpperCase() = cityArray[i]) {
            console.log(city);
            return -1;
        }
        return 1;
    }
    console.log(c)
}

//Display current weather
function showWeather(event) {
    event.preventDefault();

    if (searchCity.value.trim !== "" || searchCity.value > 0) {
        var city = searchCity.value//.trim removes white spaces beginning and end of a string
        getcurrentWeather(city);
        console.log(city);
    }

    //Save searches
    citySearches.push(searchCity.value);
}

function getcurrentWeather(city) {
    var currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    fetch(currentWeatherURL)
        .then((response) => response.json())
        .then(data => {
            console.log(data);
            temp = temp.innerHTML = Math.floor(((data['main']['temp'] - 273.15) * 1.80 + 32)) + " ℉";
            humidity = humidity.innerHTML = (data['main']['humidity'] + "%");
            windSpeed = windSpeed.innerHTML = Math.floor((data['wind']['speed'] * 2.237)) + " mph";
            uvIndex = uvIndex.innerHTML = Math.floor(data['main']['temp'] - 273.15).toFixed(2);

            var latitutde = data['coord']['lat'];
            console.log(latitutde)
            var longitude = data['coord']['lon'];
            console.log(longitude)
            var oneCallURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitutde}&lon=${longitude}&units=imperial&appid=${api_key}`
            console.log(oneCallURL);
            console.log(latitutde);
            console.log(longitude);
            weeklyForecast();
        });
};

//5 Day forecast
function weeklyForecast(city) {
    // var city = searchCity.value
    var dayover = true;
    var weekCity = searchCity.value;
    var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${weekCity}&appid=${api_key}`;

    fetch(forecastURL)
        .then((response) => response.json())
        .then(data => {
            //for each -> do something
            console.log(data)

            for (let i = 4; i < data.list.length; i+=8) { 
              const currentIndex = data.list[i];  
              const forecastCard = document.createElement('div')
              forecastCard.classList.add("column");

              const dayEl = document.createElement('h1');
              dayEl.textContent = new Date((currentIndex.dt_txt)).toLocaleDateString();
              dayEl.classList.add("date");
              forecastCard.append(dayEl);

              const iconEl = document.createElement('img');
              iconEl.src = `https://openweathermap.org/img/wn/${currentIndex.weather[0].icon}.png`;
              iconEl.classList.add("icons");
              forecastCard.append(iconEl);

              const tempEl = document.createElement('h1');
              tempEl.textContent = Math.floor(((currentIndex.main.temp - 273.15) * 1.80 + 32)) + " ℉";
              tempEl.classList.add("temper");
              forecastCard.append(tempEl);

              const humiEl = document.createElement('h4');
              humiEl.textContent = "H: " + Math.floor(currentIndex.main.humidity) + "%";
              humiEl.classList.add("temper");
              forecastCard.append(humiEl);


             forecastDiv.append(forecastCard);   
            }
        });
};

//Clears the search History
function clearSearch(clear) {
    clear.preventDefault();
    cityArray = [];
    localStorage.removeItem("cityname")
    document.location.reload();

}
searchButton.addEventListener("click", showWeather);
clearButton.addEventListener("click", clearSearch);


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
var searchButton = document.querySelector("#primary-btn");
var searchCity = document.querySelector("#searchCity");
var currentCity = document.querySelector("#currentCity");
var clearButton = document.querySelector("#clearAll");
var temp = document.querySelector("#temp");
var humidity = document.querySelector("#humi");
var windSpeed = document.querySelector("#wind");
var uvIndex = document.querySelector("#uvin");

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

    // fetch(oneCallURL)
    //     .then((response) => response.json())
    //     .then(function (data) {
    //         var mainCard = document.createElement("div");
    //         mainCard.classList.add("mainCard");

    //         var cityName = document.createElement("h2");
    //         cityName.textContent = city + "-" + new Date().toDateString();
    //         mainCard.append(cityName);
    //     })

};

//5 Day forecast
function weeklyForecast(city) {
    // var city = searchCity.value
    var dayover = true;
    var weeklyDate = document.querySelector("#date");
    var weeklyTemp = document.querySelector("#temper");
    var weedlyIcons = document.querySelector("#icons");
    var weekCity = searchCity.value;
    var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${weekCity}&appid=${api_key}`;

    fetch(forecastURL)
        .then((response) => response.json())
        .then(data => {
            for (let i = 1; i < 6; i++) {
                var iconCode = data.list[i].weather['0'].icon;
                weeklyDate = weeklyDate.innerHTML = new Date((data.list[i].dt_txt)).toLocaleDateString()
                console.log(weeklyDate);
                var iconURL = `https://openweathermap.org/img/wn/${iconCode}.png`;
                weedlyIcons = weedlyIcons.src = iconURL;
                console.log(data);
                weeklyTemp = weeklyTemp.innerHTML = Math.floor(((data.list[i].main.temp - 273.15) * 1.80 + 32)) + " ℉";
                console.log(weeklyTemp);

            }
        })
}

//Clears the search History
function clearSearch(clear) {
    clear.preventDefault();
    cityArray = [];
    localStorage.removeItem("cityname")
    document.location.reload();

}
searchButton.addEventListener("click", showWeather);
clearButton.addEventListener("click", clearSearch);

/*5 Day forecast */
//api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

//lat - longitude (One Call)


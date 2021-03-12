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

function getWeather(city){
    var currentWeatherURL = `http://api.openweathermap.org/data/2.5/weather?id={city id}&appid={API key}`;
}
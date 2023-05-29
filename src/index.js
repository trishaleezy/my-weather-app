function formatDate(date) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let day = days[date.getDay()];
  let month = months[date.getMonth()];
  let currDate = date.getDate();
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let formattedDate = `${currDate} ${month} ${day}, ${hour}:${minutes}`;
  return formattedDate;
}
let dateTime = document.querySelector("h5");
let currentTime = new Date();
dateTime.innerHTML = formatDate(currentTime);

function toCelsius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = "34°C";
}

let changeCelsius = document.querySelector("#celsius-link");
changeCelsius.addEventListener("click", toCelsius);

function toFarenheit(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = "93.2°F";
}

let changeFarenheit = document.querySelector("#farenheit-link");
changeFarenheit.addEventListener("click", toFarenheit);

console.log("click", toFarenheit);
console.log("click", toCelsius);

function currentWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  let city = document.querySelector("#city");
  city.innerHTML = `${response.data.name}`;
  currentTemp.innerHTML = `${temperature}°C`;
}

function retrievePosition(position) {
  let apiKey = "9634a0ae40863e50c075cafbda619025";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(currentWeather);
}

function getLocation(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let searchLocationButton = document.querySelector("#user-location-button");
searchLocationButton.addEventListener("click", getLocation);

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  let cityInput = document.querySelector("#city-form").value;
  let city = document.querySelector("#city");
  city.innerHTML = `${cityInput}`;
  currentTemp.innerHTML = `${temperature}°C`;
}

function searchCity(cityInput) {
  let apiKey = "9634a0ae40863e50c075cafbda619025";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-form").value;
  searchCity(cityInput);
}

let goButton = document.querySelector("#go-button");
goButton.addEventListener("click", changeCity);

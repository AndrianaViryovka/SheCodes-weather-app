//Feature #1
let currentTime = new Date();
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[currentTime.getMonth()];
  let currentDay = days[currentTime.getDay()];
  let mins = ("0" + currentTime.getMinutes()).slice(-2);
  let time = `${month} ${currentTime.getDate()}, ${currentDay} ${currentTime.getHours()}:${mins}`;

  document.getElementById("datetime").textContent = time;
  return time;
}
console.log(formatDate(currentTime));

//Feature #2
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-search");

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
}
let form = document.querySelector("#search-form");

form.addEventListener("submit", search);

//Current location
function showCurrentTemp(response) {
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#city-temp").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  celsiusTemperature = response.data.temperature.current;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", response.data.condition.icon_url);
}

function retrievePosition(position) {
  let apiKey = "7430tbf5f05ao352a53c0ca582a6554b";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  //let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=en&appid=${apiKey}`;
  let url = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}`;
  https: axios.get(url).then(showCurrentTemp);
}
function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let currentLocationResult = document.querySelector("#cityButton");
currentLocationResult.addEventListener("click", currentLocation);

//Search city
function showWeather(response) {
  document.querySelector("#city-temp").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#city-search").innerHTML = response.data.city;
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  celsiusTemperature = response.data.temperature.current;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );

  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.city;
}

function citySearch(city) {
  let apiKey = "7430tbf5f05ao352a53c0ca582a6554b";
  //let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=${apiKey}&units=metric`;
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(url).then(showWeather);
}
function Search(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  citySearch(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", Search);

//Feature #3
let cityTemp = document.querySelector("#city-temp");

function clickOnLinkF() {
  //let fahrenheitTemperature = (cityTemp * 9) / 5 + 32;
  cityTemp.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
  //cityTemp.innerHTML = Math.round(fahrenheitTemperature);
  //cityTemp.innerHTML = `50`;
}

let elementF = document.querySelector("#fahrenheit-link");
elementF.addEventListener("click", clickOnLinkF);

function clickOnLinkC() {
  cityTemp.innerHTML = Math.round(celsiusTemperature);
}

let elementC = document.querySelector("#celsius-link");
elementC.addEventListener("click", clickOnLinkC);

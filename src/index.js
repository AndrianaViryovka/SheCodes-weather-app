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
  let currentDay = days[currentTime.getDay()];
  let mins = ("0" + currentTime.getMinutes()).slice(-2);
  let time = `${currentDay} ${currentTime.getHours()}:${mins}`;

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
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#city-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=en&appid=${apiKey}`;
  axios.get(url).then(showCurrentTemp);
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
    response.data.main.temp
  );
  document.querySelector("#city-search").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
}

function citySearch(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=${apiKey}&units=metric`;
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
/*let cityTemp = document.querySelector("#city-temp");

function clickOnLinkF() {
  cityTemp.innerHTML = `50`;
}

let elementF = document.querySelector("#fahrenheit-link");
elementF.addEventListener("click", clickOnLinkF);

function clickOnLinkC() {
  cityTemp.innerHTML = `10`;
}

let elementC = document.querySelector("#celsius-link");
elementC.addEventListener("click", clickOnLinkC);*/

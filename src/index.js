// Date and time
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

// City search event
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-search");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

// Current location
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
  document.querySelector("#feels_like").innerHTML = Math.round(
    response.data.temperature.feels_like
  );
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  celsiusTemperature = response.data.temperature.current;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", response.data.condition.icon_url);

  getForecast(response.data.city);
}

// Daily forecast
function getForecast(city) {
  let apiKey = "e7cba0f4344b9ae720f19t5d48co46c3";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

// Days of the week
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
// Weather Forecast
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `
      <div class="row justify-content-center">
  `;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML += `

           <div class="col-sm-2">
            <div class="shadow-lg p-1 mb-8 bg-body rounded">
              <div class="card">
                <div class="card-body">
                      <div class="weather-forecast-date">${formatDay(
                        forecastDay.time
                      )}</div>
                    <img
                    src="${forecastDay.condition.icon_url}"
                    alt="forecast-icon"
                    id="weather-icon"
                  />
                                    <div class="weather-forecast-temperatures">
                    <span
                      class="weather-forecast-temperature-max"
                      id="text-card"
                    >
                      <strong> ${Math.round(
                        forecastDay.temperature.maximum
                      )}° </strong>|
                    </span>
                    <span
                      class="weather-forecast-temperature-min"
                      id="text-card"
                    >
                      ${Math.round(forecastDay.temperature.minimum)}°
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
   
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function retrievePosition(position) {
  let apiKey = "7430tbf5f05ao352a53c0ca582a6554b";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
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
  document.querySelector("#feels_like").innerHTML = Math.round(
    response.data.temperature.feels_like
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

  getForecast(response.data.city);
}

function citySearch(city) {
  let apiKey = "7430tbf5f05ao352a53c0ca582a6554b";
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

// Convert celsius to fahrenheit
let cityTemp = document.querySelector("#city-temp");

function clickOnLinkF() {
  cityTemp.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}

let elementF = document.querySelector("#fahrenheit-link");
elementF.addEventListener("click", clickOnLinkF);

function clickOnLinkC() {
  cityTemp.innerHTML = Math.round(celsiusTemperature);
}

let elementC = document.querySelector("#celsius-link");
elementC.addEventListener("click", clickOnLinkC);

// search city by default
citySearch("Kyiv");

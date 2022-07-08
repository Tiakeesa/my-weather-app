let now = new Date();
let h2 = document.querySelector("h2");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

h2.innerHTML = `${day} ${hours}:${minutes}`;

function hourlyForecast() {
  let forecastElement = document.querySelector("#hor-display");

  let forecastHTML = `<div class="row">`;
  let hours = ["9AM", "10AM", "11AM", "12PM", "1PM"];
  hours.forEach(function (hour) {
    forecastHTML =
      forecastHTML +
      `
  <div class="col-2">
    <div class="weather-forecast-hourly">${hour}
      <div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
        <div class="hourly-forecast">
          <span class="hourly-forecast-max">18 </span>
        </div>
      </div>
    </div>
  </div>
  `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function weeklyForecast() {
  let forecastElement = document.querySelector("#ver-display");

  let forecastHTML = `<div class="second-row">`;
  let weekly = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
  weekly.forEach(function (weekday) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-10">
      <div class="weather-forecast-weekly">${weekday}</div>
      <span class="weekly-icon-temp"> 18
      <img src="http://openweathermap.org/img/wn/50d@2x.png"
      alt=""
      width="42"
      />
      </span>
    </div>
</div>
</div>
</div>
  `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function celsius(event) {
  event.preventDefault();
  let celsiusTemp = document.querySelector("#temperature");
  celsiusTemp.innerHTML = 18;
}
function fahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", celsius);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", fahrenheit);

function currentWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

hourlyForecast();
weeklyForecast();

function searchCity(city) {
  let apiKey = "b95e4d9ece25e5d23a804d0d19379e1f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search").value;
  searchCity(city);
}
let searchForm = document.querySelector("#input-city");
searchForm.addEventListener("submit", handleSubmit);

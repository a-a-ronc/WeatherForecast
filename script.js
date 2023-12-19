const searchForm = document.getElementById('searchForm');
const cityInput = document.getElementById('cityInput');
const currentWeatherSection = document.getElementById('currentWeather');
const forecastSection = document.getElementById('forecast');
const searchHistorySection = document.getElementById('searchHistory');
const apiKey = '58caa7e9dd46d1aae297d68bb0e3f720';
const cityList = [];


// Event listener for the form submission
searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const cityName = cityInput.value;
    // Call a function to fetch weather data based on the city name
    getWeatherData(cityName);
});


// Function to fetch weather data from the API
function getWeatherData(cityName) {
    cityList.push(cityName);
    localStorage.setItem('city list', JSON.stringify(cityList));
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            updateCurrentWeather(data);
            // Assuming the API provides coordinates in the response, use them for the forecast
            const lon = data.coord.lon;
            const lat = data.coord.lat;
            getForecastData(lat, lon);
            updateSearchHistory();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}


function getForecastData(lat, lon) {
    forecastSection.innerHTML = '';
    var url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    fetch(url)
        .then(function (x) {
            return x.json();
        })
        .then(function (y) {
            for (let index = 0; index < y.list.length; index += 8) {
                var fiveDayForecast = `
                    <div class="forecast-day">
                        <div class="image-container">
                            <img src="https://openweathermap.org/img/w/${y.list[index].weather[0].icon}.png" alt="image">
                        </div>
                        <p>Date: ${new Date(y.list[index].dt * 1000).toLocaleDateString()} </p>
                        <p>Temperature: ${y.list[index].main.temp}°K </p>
                        <p>Humidity: ${y.list[index].main.humidity}% </p>
                        <p>Wind Speed: ${y.list[index].wind.speed} m/s </p>
                    </div>
                `;
                var divEl = document.createElement("div");
                divEl.innerHTML = fiveDayForecast;
                forecastSection.appendChild(divEl);
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

// Function to update the current weather section
function updateCurrentWeather(data) {
    // Update the currentWeatherSection based on the API response
    // Display the city name, date, weather icon, temperature, humidity, and wind speed
    currentWeatherSection.innerHTML = `
        <h2>${data.name}  </h2>
        <p> Date: ${new Date(data.dt * 1000).toLocaleDateString()} </p>
        <p> Temperature: ${data.main.temp}°K </p>\n
        <p> Humidity: ${data.main.humidity}% </p>
        <p> Wind Speed: ${data.wind.speed} m/s </p>
    `;
}

function updateSearchHistory() {
    var cityArray = JSON.parse(localStorage.getItem('city list')) || [];
    searchHistorySection.innerHTML = '';
    for (let i = 0; i < cityArray.length; i++) {
        var btn = document.createElement('button');
        btn.setAttribute("class", "cityButton");
        btn.innerHTML = cityArray[i];
        btn.onclick = handleClick;
        searchHistorySection.appendChild(btn);
    }

}
// updateSearchHistory();
function handleClick(e) {
    var element = e.target.innerHTML;
    console.log(element);
    getWeatherData(element);
}



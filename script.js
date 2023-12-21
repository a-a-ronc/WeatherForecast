//identify all variables either from the DOM, activate the API key or an array
const searchForm = document.getElementById('searchForm');
const cityInput = document.getElementById('cityInput');
const currentWeatherSection = document.getElementById('currentWeather');
const forecastSection = document.getElementById('forecast');
const searchHistorySection = document.getElementById('searchHistory');
const apiKey = '58caa7e9dd46d1aae297d68bb0e3f720';
const cityList = [];


// Event listener for the search button form submission
// Searches through the API documentation for the city name that is identified by 
// the user
searchForm.addEventListener('submit', function (event) {
    // prevent default disables the default form submission which typically involves reloading the 
    // page; allows for custom behavior to be implemented
    event.preventDefault();
    const cityName = cityInput.value;
    // Call a function to fetch weather data based on the city name
    getWeatherData(cityName);
});


// Function to fetch weather data from the API
function getWeatherData(cityName) {
    // Appends the current city name to an array called city list
    cityList.push(cityName);
    // Converts the cityList array to a JSON string and stores it in the local storage under the 
    // key city list; allows access to search after reloading the page
    localStorage.setItem('city list', JSON.stringify(cityList));
    // References the OpenWeatherMap API; includes cityName and API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
// Uses a fetch function to send a request to the OpenWeathMap API using the constructed url
    fetch(apiUrl)
        .then(response => {
            // Handles the response from the fetch operation; if response is not ok it throws an 
            //error otherwise it returns the JSON representation of the response
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        // Processes the JSON data received from the API
        .then(data => {
            // Logs the data to the console
            console.log(data);
            // Calls a function to to update the current weather section based on the received data
            updateCurrentWeather(data);
            // Extracts the latitude and longitude from the API response and uses them to call getForecastData
            const lon = data.coord.lon;
            const lat = data.coord.lat;
            getForecastData(lat, lon);
            // Calls the function updateSearchHistory
            updateSearchHistory();
        })
        .catch(error => {
            // Handles errors with the fetch operation
            console.error('There was a problem with the fetch operation:', error);
        });
}

// Designed to fetch and display the forecast data based off of the latitude and longitudinal parameters
// Using the API
function getForecastData(lat, lon) {
    // Clears the content of the html element iwth the id forecastSection; ensures this section is empty before adding 
    // new forecast data
    forecastSection.innerHTML = '';
    // Constructs the url for fetching forecast data by including the latitude and longitude of the specific
    // location
    var url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    // Same as before; uses fetch function to send a request to the API and constructed url
    fetch(url)
        .then(function (x) {
            return x.json();
        })
        // Handles the response once again by converting it to JSON; result is then passed on to the next block
        .then(function (y) {
            for (let index = 0; index < y.list.length; index += 8) {
                // processes the JSON data received from the API; the time frame for data is every 3 hours in 
                // the API so the data is received every 8th element to represent a day; the extracted data then includes
                // date, temperature, humidity and wind speed and is placed into a div in the html file
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
                // Creates a new HTML element and appends the forecast data
                var divEl = document.createElement("div");
                divEl.innerHTML = fiveDayForecast;
                forecastSection.appendChild(divEl);
            }
        })
        // Once again catches any errors that occur during the fetch operation and logs them into the console
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
// Retrieves the HTML content of the target element that triggered the click event
// e.target refers to the element that was clicked and the content is then stored in the variable 
// Element
function handleClick(e) {
    var element = e.target.innerHTML;
    // Logs the element to the console
    console.log(element);
    // Calls the function getWeatherData
    getWeatherData(element);
}



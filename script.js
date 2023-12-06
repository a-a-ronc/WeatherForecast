document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('searchForm');
    const cityInput = document.getElementById('cityInput');
    const currentWeatherSection = document.getElementById('currentWeather');
    const forecastSection = document.getElementById('forecast');
    const searchHistorySection = document.getElementById('searchHistory');

    // Event listener for the form submission
    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const cityName = cityInput.value;

        // Call a function to fetch weather data based on the city name
        getWeatherData(cityName);
    });

    // Function to fetch weather data from the API
    function getWeatherData(cityName) {
        const apiKey = '58caa7e9dd46d1aae297d68bb0e3f720';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                updateCurrentWeather(data);
                // Assuming the API provides coordinates in the response, use them for the forecast
                const lon = data.coord.lon;
                const lat = data.coord.lat;
                getForecastData(lon, lat);
                updateSearchHistory(cityName);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
        // Use the OpenWeatherMap API or any other weather API of your choice
        // Make a fetch request and update the currentWeatherSection and forecastSection accordingly
        // Remember to update the search history as well
        // ...

        // Example: You can use the fetch code from the previous examples to get started
    }

    // Function to update the current weather section
    function updateCurrentWeather(data) {
        // Update the currentWeatherSection based on the API response
        // Display the city name, date, weather icon, temperature, humidity, and wind speed
        // ...
        currentWeatherSection.innerHTML = `
        <h2>${data.name}</h2>
        <p>Date: ${new Date(data.dt * 1000).toLocaleDateString()}</p>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
    }

    // Function to update the 5-day forecast section
    function updateForecast(data) {
        // Update the forecastSection based on the API response
        // Display the date, weather icon, temperature, humidity, and wind speed for each day
        // ...
        forecastSection.innerHTML = '';
        dailyData.forEach(day => {
            forecastSection.innerHTML += `
                <div class="forecast-day">
                    <p>Date: ${new Date(day.dt * 1000).toLocaleDateString()}</p>
                    <p>Temperature: ${day.temp.day} °C</p>
                    <p>Humidity: ${day.humidity}%</p>
                    <p>Wind Speed: ${day.wind_speed} m/s</p>
                </div>
            `;
        });
    }

    // Function to update the search history
    function updateSearchHistory(cityName) {
        const searchHistoryItem = document.createElement('div');
        searchHistoryItem.textContent = cityName;
        searchHistorySection.appendChild(searchHistoryItem);
        // Update the searchHistorySection with the new search history
        // ...
    }

    // You can add more functions and code as needed based on your specific requirements
});

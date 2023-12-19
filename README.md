# Work Day Scheduler Starter Code
_________________________________

GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
Mock-Up

## Overview

This is a 5 day weather forecast. The user is able to input a city into the prompt and retrieve a five day forecast of the city. 

## Features

- UI city query 
- Event storage within a certain time frame
- View saved cities and retrieve weather on click
- Usage of local storage
- Usage of Open Weather Map API

## How to Use

1. **City Search**: Click the text box to search for the weather in a city. Then click search.
2. **Save City Name and Weather**: The city name is saved in local storage. As the user searches for more cities, the local storage grows. The user now has the ability to click the city and get the weather data without having to type and search.
3. **Retain Date**: Feel free to refresh the page and still have the city name stored. 

## Technologies Used

- HTML
- CSS
- JavaScript
- Open Weather Map API

## Setup

1. Clone the repository to your local machine.
2. Open the `index.html` file in a web browser.

## Application Structure

- `index.html`: Main HTML file.
- `style.css`: Stylesheet for styling the application.
- `script.js`: JavaScript file containing the application logic.

## Issues and Future Modifications
- **Styling** - would like to format the current city weather to be a bit prettier; also change forecast to have the same size containers and justify the content throughout it to make it look more symmetrical
- **Units** - change from Kelvin to Fahrenheit because users do not generally check weather in Kelvin
- **Update Search History Function** - had issues where I would append the most recent city being searched but it repeated city searches; had to clear the list before the for loop that would append to eliminate recurring city entries


## Contributions

Contributions are welcome! If you find any issues or want to enhance the application, submit a pull request. Assistance was received from both my TA as well as instructor. Shout out to Dennis Itua and Karina Guerrero. 


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

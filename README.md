# Weather Dashboard

## Description

This weather dashboard is a basic search tool to find current weather for a city, as well as the 5-day forecast.

## Built With

* HTML
* JavaScript
* Bootstrap CSS framework
* Custom CSS
* OpenWeather API: https://openweathermap.org/api

## Process

This application required implementing the following functionality:

* An input form allows users to type in a city name and search for the weather in that city.

* The searched city is stored in localStorage and persist after the page is refreshed.

* When the page is loaded or refreshed, the 7 most recently searched cities from localStorage are populated on the page in the form of buttons that, when clicked, will display the weather data for that city without the need for the user to type the city into the input element.

* As more cities are searched using the input element, each search adds a new button to the page. The buttons are ordered in descending order, with the most recently searched items appearing first.

* When a city is searched, either by typing it into the input element or by clicking a city button, an call is made to the OpenWeather API to retrieve current weather information for that city.

* The retrieved weather information is displayed on the page and updated as new cities are searched.

## Links

View the deployed application: https://dmadon.github.io/weather-dashboard/

View the repository: https://github.com/dmadon/weather-dashboard/

## Preview



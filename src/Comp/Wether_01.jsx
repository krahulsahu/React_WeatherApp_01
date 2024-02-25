import React, { useState } from "react";
import "./Weather.css";
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloudy_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import humidity_icon from "../Assets/humidity.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(cloudy_icon);

  let api_key = "77f48c625469eadefa076ca51ca59c43"; // API Key for Openweathermap API

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return alert("Please enter a city name!");
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

    try {
      let response = await fetch(url);
      let data = await response.json();
      setWeatherData(data);

      switch (data.weather[0].icon) {
        case "01d":
        case "01n":
          setWeatherIcon(clear_icon);
          break;
        case "02d":
        case "02n":
        case "03d":
        case "03n":
        case "04d":
        case "04n":
          setWeatherIcon(cloudy_icon);
          break;
        case "09d":
        case "09n":
        case "10d":
        case "10n":
          setWeatherIcon(rain_icon);
          break;
        case "13d":
        case "13n":
          setWeatherIcon(snow_icon);
          break;
        default:
          setWeatherIcon(clear_icon);
          break;
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className="WeatherApp">
      <div className="top_bar">
        <input type="text" className="cityInput" placeholder="Search" />
        <div className="search_icon" onClick={search}>
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="weather_image">
        <img src={weatherIcon} alt="" />
      </div>
      {weatherData && (
        <>
          <div className="weather_temp">{weatherData.main.temp}°C </div>
          <div className="weather_location">{weatherData.name}</div>
          <div className="data-container">
            <div className="element">
              <img src={humidity_icon} alt="" className="icon" />
              <div className="data">
                <div className="humidity-percent">
                  {weatherData.main.humidity}%
                </div>
                <div className="text">Humidity</div>
              </div>
            </div>
            <div className="element">
              <img src={wind_icon} alt="" className="icon" />
              <div className="data">
                <div className="wind-rate">
                  {Math.round(weatherData.wind.speed)} km/h
                </div>
                <div className="text">Wind Speed</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
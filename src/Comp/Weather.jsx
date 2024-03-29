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
  let api_key = "77f48c625469eadefa076ca51ca59c43"; //API Key for Openweathermap API
  
  const [wicon, setwicon] = useState(cloudy_icon);
  const search = async() => {
      const element = document.getElementsByClassName("cityInput");
      if(element[0].value === ""){
          return   alert("Please enter a city name!");
      } 
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;


      let response = await fetch(url);
      let data = await response.json();
      const humidity = document.getElementsByClassName("humidity-percent");
      const wind = document.getElementsByClassName("wind-rate");
      const temp = document.getElementsByClassName("weather_temp")
      const location = document.getElementsByClassName("weather_location")

      humidity[0].innerHTML = data.main.humidity+"%";
      wind[0].innerHTML = Math.round(data.wind.speed)+" km/h";
      temp[0].innerHTML = Math.round(data.main.temp) + "°C";
      location[0].innerHTML = data.name;

      if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
          setwicon(clear_icon);
      } else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
          setwicon(cloudy_icon);
      } else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
          setwicon(drizzle_icon);
      }
      else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
          setwicon(drizzle_icon);
      }
      else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
          setwicon(rain_icon);
      }
      else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
          setwicon(rain_icon);
      }
      else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
          setwicon(snow_icon);
      } else {
          setwicon(clear_icon);
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
        <img src={wicon} alt="" />
      </div>
      <div className="weather_temp">55°C </div>
      <div className="weather_location">Begusarai</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">60%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate">60 km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;

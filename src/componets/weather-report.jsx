import React from "react";
import humidity_icon from "../assets/humidity.png";
import wind_icon from "../assets/wind.png";

function WeatherReport({ weatherData }) {
  return (
    <div>
      <div className="img-and-name-container">
        <img
          src={
            weatherData
              ? `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
              : null
          }
          alt=""
        />
        <p>
          {weatherData?.main?.temp
            ? Math.floor(weatherData.main.temp) + "°c"
            : "cityName"}
        </p>
        <p className="city-name-display">{weatherData?.name}</p>
      </div>
      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="humidity_image" />
          <div>
            <p>{weatherData?.main?.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_icon} alt="humidity_image" />
          <div>
            <p>{weatherData?.wind?.speed} km/h</p>
            <span>Wind</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherReport;

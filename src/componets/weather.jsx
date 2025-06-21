import React, { useEffect, useState } from "react";
import "./weather.css";
import "./responsive.css";
import WeatherReport from "./weather-report";

const localKey = "cityName";
const apiKey = "d94b975138181b1866b395a098907186";

const initialCityName = {
  cityName: localStorage.getItem(localKey)
    ? localStorage.getItem(localKey)
    : "",
};

function Weather({ city }) {
  // const storedCity = localStorage.getItem(localKey);
  // const userCityName = city || initialCityName.cityName;

  const [inputValue, setInputValue] = useState("");
  const [cityName, setCityName] = useState(initialCityName.cityName);
  const [weatherData, setWeatherData] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [date, setdate] = useState("");

  async function fetchCityWeatherData() {
    try {
      setLoading(true);
      const apiResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
      );
      if (!apiResponse.ok) {
        setErrorMsg("No data found! Please check if there any mistake...");
        setLoading(false);
      }
      const result = await await apiResponse.json();
      if (result && result.name) {
        setLoading(false);
        setWeatherData(result);
        setErrorMsg(false);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      setErrorMsg(false);
      setWeatherData(false);
    }
  }

  function fetchDate() {
    const timeInterval = setInterval(() => {
      const data = new Date();
      setdate(
        data.toLocaleString("en-IN", {
          dateStyle: "long",
          timeStyle: "medium",
        })
      );
    }, 1000);
  }

  useEffect(() => {
    localStorage.setItem(localKey, cityName);
  }, [cityName]);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      fetchDate();
    }, 1000);
    return () => clearInterval(timeInterval);
  }, []);

  useEffect(() => {
    if (city !== "") {
      setCityName(city);
      setLoading(false);
    }
  }, [city]);

  useEffect(() => {
    if (cityName !== "") fetchCityWeatherData();
  }, [cityName]);

  function handleKeyPressEnter(e) {
    if (e.keyCode === 13) {
      setCityName(inputValue.trim());
      setInputValue("");
    }
  }

  console.log(weatherData, "jiczd");

  return (
    <div className="weather-container">
      <h1>Weather App</h1>
      <h4>{date}</h4>
      <div className="search-container">
        <input
          type="text"
          name="inputValue"
          placeholder="Seach city name..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPressEnter}
        />
        <button
          onClick={() => {
            console.log(inputValue);
            setCityName(inputValue.trim());
            setInputValue("");
          }}
        >
          Search
        </button>
      </div>
      {loading ? (
        <h3 className="loading-data">Fetching data! Please wait...</h3>
      ) : null}
      {errorMsg || !weatherData ? (
        <h3 className="error-message">{errorMsg}</h3>
      ) : (
        <WeatherReport weatherData={weatherData} />
      )}
    </div>
  );
}

export default Weather;

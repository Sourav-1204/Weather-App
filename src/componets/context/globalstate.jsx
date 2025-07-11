import React, { createContext, useContext, useEffect, useState } from "react";

export const WeatherContext = createContext();

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const localKey = "cityName";

const initialCityName =
  sessionStorage.getItem(localKey) !== null &&
  sessionStorage.getItem(localKey) !== undefined
    ? sessionStorage.getItem(localKey)
    : "";

export default function GlobalState({ children }) {
  const [loading, setLoading] = useState(false);
  const [forecastData, setForecastData] = useState(false);
  const [hourlyForecast, setHourlyForecast] = useState(false);
  const [cityName, setCityName] = useState(initialCityName);
  const [currentDayData, setCurrentDayData] = useState(false);
  const [error, setError] = useState("");
  const [coord, setCoord] = useState({
    latitude: null,
    longitude: null,
  });

  // async function fetchCoordinates() {
  //   try {
  //     setLoading(true);
  //     const apiResponse = await fetch(
  //       `http://api.openweathermap.org/geo/1.0/direct?q=delhi&limit=5&appid=${API_KEY}&units=metric`
  //     );
  //     const result = await apiResponse.json();
  //     if (result && result.length > 0) {
  //       setCoord({
  //         latitude: result[0].lat.toFixed(4),
  //         longitude: result[0].lon.toFixed(4),
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  async function fetchForecastData() {
    try {
      setLoading(true);
      const apiResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      const result = apiResponse.ok ? await apiResponse.json() : [];
      const forecastDataByDay = {};
      result.list.filter((item) => {
        const date = item.dt_txt.split(" ")[0];
        if (!forecastDataByDay[date]) {
          forecastDataByDay[date] = item;
        }
      });
      const filtered = Object.values(forecastDataByDay);
      if (filtered && filtered.length > 0) {
        setForecastData(filtered);
      }

      if (result && result.list && result.list.length > 0) {
        const hourlyData = result.list.slice(2, 10);
        setHourlyForecast(hourlyData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCurrentWeatherData() {
    try {
      setLoading(true);
      const apiResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      const result = apiResponse.ok ? await apiResponse.json() : false;
      console.log(result);
      if (result) {
        setCurrentDayData(result);
      }
    } catch (error) {
      setError(`looks like! you entered wrong city name ${cityName}`);
      setCurrentDayData([]);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // useEffect(() => {
  //   fetchCoordinates();
  // }, []);

  useEffect(() => {
    if (cityName !== "") {
      fetchForecastData();
      fetchCurrentWeatherData();
      sessionStorage.setItem(localKey, cityName);
    }
  }, [cityName]);

  const formDate = (dttxt) => {
    const date = new Date(dttxt);
    const weekday = date.toLocaleDateString("en-US", {
      weekday: "long",
    });

    const dayMonth = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });
    return `${weekday}, ${dayMonth}`;
  };

  const toHHMM = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <WeatherContext.Provider
      value={{
        forecastData,
        loading,
        hourlyForecast,
        formDate,
        cityName,
        setCityName,
        toHHMM,
        currentDayData,
        error,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

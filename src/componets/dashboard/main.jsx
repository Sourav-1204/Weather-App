import React, { useContext, useEffect, useState } from "react";
import WeatherDetails from "./weather-details";
import Forecast from "./5daysForcast";
import HourlyForecast from "./hourlyForecast";
import { WeatherContext } from "../context/globalstate";
import { useFetcher } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { TbCurrentLocation } from "react-icons/tb";

export default function Main() {
  const { cityName, setCityName, currentDayData } = useContext(WeatherContext);
  const [currentTime, setCurrentTime] = useState("");

  let todayDate = "";

  const time = () => {
    const date = new Date();
    const hours = (date.getHours() % 12 || 12).toString().padStart(2, "0");
    let minutes = date.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  const currentDate = () => {
    const date = new Date();
    const weekday = date.toLocaleDateString("en-US", {
      weekday: "long",
    });

    const dayMonth = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });
    return `${weekday}, ${dayMonth}`;
  };

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(time());
    };
    updateTime();
    const intervalId = setInterval(updateTime, 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className=" w-full md:w-[80%] md:h-[550px] flex flex-col justify-center mt-10 gap-4 mb-10 md:mb-0">
      <div
        id="main-top"
        className="w-[100%] md:h-[50%] flex justify-between items-center px-3"
      >
        <div
          id="top-left"
          className="w-[35%] md:h-[90%] bg-[var(--main-color)] rounded-[30px] shadow-[var(--main-shadow)] flex flex-col items-center justify-center gap-6 py-10 md:py-0"
        >
          <h1 className="text-4xl font-bold flex items-center gap-2"><span className="text-3xl~"><CiLocationOn /></span> {currentDayData.name}</h1>
          <div className=" flex flex-col items-center">
            <p className="text-8xl font-bold">{currentTime}</p>
            <p>{(todayDate = currentDate())}</p>
          </div>
        </div>
        <div
          id="top-right"
          className="md:w-[60%] md:h-[90%] bg-[var(--main-color)] rounded-[30px] shadow-[var(--main-shadow)]"
        >
          <WeatherDetails />
        </div>
      </div>
      <div
        id="main-bottom"
        className="w-[100%] h-[50%] flex  justify-between items-center px-3"
      >
        <div
          id="bottom-left"
          className="md:w-[30%] h-[95%] bg-[var(--main-color)] rounded-[30px] shadow-[var(--main-shadow)]"
        >
          <Forecast />
        </div>
        <div
          id="bottom-right"
          className="md:w-[65%] h-[95%] bg-[var(--main-color)] rounded-[30px] shadow-[var(--main-shadow)]"
        >
          <HourlyForecast />
        </div>
      </div>
    </div>
  );
}

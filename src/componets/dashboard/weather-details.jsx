import React, { useContext } from "react";
import sunrise from "../../assets/sunrise.png";
import sunset from "../../assets/sunset.png";
import clear from "../../assets/clear.png";
import humidity from "../../assets/humidity1.png";
import wind from "../../assets/wind1.png";
import uv from "../../assets/uvInd.png";
import pressure from "../../assets/pressure.png";
import { WeatherContext } from "../context/globalstate";

export default function WeatherDetails() {
  const { toHHMM, currentDayData } = useContext(WeatherContext);

  console.log(currentDayData,"current")
  return (
    currentDayData && (
      <div
        id="top-right-main"
        className="w-full h-full flex items-center justify-evenly"
      >
        <div
          id="start"
          className="md:w-[33%] h-full flex flex-col items-center"
        >
          <div className="w-full h-[50%] flex flex-col justify-center md:justify-end items-center">
            <p className="text-7xl md:text-6xl bg-[linear-gradient(55deg,_#292929,_#888888)] bg-clip-text text-transparent font-bold">
              {Math.floor(currentDayData?.main?.temp)}°C
            </p>
            <p className="text-lg md:text-base font-medium flex items-center gap-1">
              Feels like:
              <span className="text-2xl text-[#3c3c3c] font-bold">
                {Math.floor(currentDayData?.main?.feels_like)}°C
              </span>
            </p>
          </div>
          <div className="w-full h-[50%] flex md:flex-col md:justify-start justify-evenly items-center space-y-2">
            <div id="sunrise" className="flex items-center gap-2 mt-2">
              <img src={sunrise} alt="sunrise" className="size-9 md:size-8" />
              <div>
                <p className="text-lg md:text-base font-bold">Sunrise</p>
                <p className="text-sm md:text-xs">
                  {toHHMM(currentDayData?.sys?.sunrise)}
                </p>
              </div>
            </div>
            <div id="sunset" className="flex items-center gap-2">
              <img src={sunset} alt="sunrise" className="size-9 md:size-8" />
              <div>
                <p className="text-lg md:text-base font-bold">Sunset</p>
                <p className="text-sm md:text-xs">
                  {toHHMM(currentDayData?.sys?.sunset)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div id="middle" className="md:w-[33%] h-full">
          <div className="w-full flex flex-col items-center justify-start">
            <img
              src={`https://openweathermap.org/img/wn/${currentDayData.weather[0].icon}@2x.png`}
              alt="clear"
              className="w-[180px]"
            />
            <p className="text-3xl font-bold">{currentDayData?.weather[0]?.main}</p>
          </div>
        </div>
        <div
          id="end"
          className="w-[98%] md:w-[33%] h-full flex flex-col items-center justify-center md:gap-4"
        >
          <div className="w-full h-[40%] flex justify-between items-center mt-4 gap-2 md:gap-0">
            <div className="w-[50%] flex flex-col items-center justify-center gap-3 hello">
              <img src={humidity} alt="humdity" className="size-[35px]" />
              <div className="flex flex-col items-center md:gap-1">
                <p className="md:text-[18px] text-[24px] font-bold">
                  {currentDayData.main.humidity}%
                </p>
                <p className="text-[14px] md:text-[12px]">Humidity</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center w-[50%] gap-3 hello">
              <img src={wind} alt="wind" className="size-[35px]" />
              <div className="flex flex-col items-center md:gap-1">
                <p className="md:text-[18px] text-[24px] font-bold">
                  {Math.floor(currentDayData.wind.speed)}km/h
                </p>
                <p className="text-[14px] md:text-[12px]">Wind Speed</p>
              </div>
            </div>
          </div>
          <div className="w-full h-[40%] flex justify-between items-center gap-2 md:gap-0">
            <div className="flex flex-col items-center justify-center w-[50%] gap-3 hello">
              <img src={pressure} alt="humdity" className="size-[35px]" />
              <div className="flex flex-col items-center md:gap-2">
                <p className="md:text-[18px] text-[24px] font-bold">
                  {currentDayData.main.pressure}hPa
                  <p className="text-[14px] md:text-[12px] font-normal">Pressure</p>
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center w-[50%] gap-3 hello">
              <img src={uv} alt="wind" className="size-[35px]" />
              <div className="flex flex-col items-center md:gap-1">
                <p className="md:text-[18px] text-[24px] font-bold">
                  {Math.floor(Math.random() * 5)}
                </p>
                <p className="text-[14px] md:text-[12px]">UV index</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

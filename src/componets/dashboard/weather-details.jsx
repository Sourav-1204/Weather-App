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
  return (
    currentDayData && (
      <div
        id="top-right-main"
        className="w-full h-full flex items-center justify-evenly"
      >
        <div id="start" className="w-[33%] h-full flex flex-col items-center">
          <div className=" h-[50%] flex flex-col justify-end items-center">
            <p className="text-6xl bg-[linear-gradient(55deg,_#292929,_#888888)] bg-clip-text text-transparent font-bold">
              {Math.floor(currentDayData?.main?.temp)}°C
            </p>
            <p className="font-medium flex items-center gap-1">
              Feels like:
              <span className="text-2xl text-[#3c3c3c] font-bold">
                {Math.floor(currentDayData?.main?.feels_like)}°C
              </span>
            </p>
          </div>
          <div className="h-[50%] flex flex-col justify-start items-center space-y-2">
            <div className="flex items-center gap-2 mt-2">
              <img src={sunrise} alt="sunrise" className="size-8" />
              <div>
                <p className="font-bold">Sunrise</p>
                <p className="text-xs">
                  {toHHMM(currentDayData?.sys?.sunrise)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <img src={sunset} alt="sunrise" className="size-8" />
              <div>
                <p className="font-bold">Sunset</p>
                <p className="text-xs">{toHHMM(currentDayData?.sys?.sunset)}</p>
              </div>
            </div>
          </div>
        </div>
        <div id="middle" className="w-[33%] h-full">
          <div className="w-full flex flex-col items-center justify-start">
            <img
              src={`https://openweathermap.org/img/wn/${currentDayData.weather[0].icon}@2x.png`}
              alt="clear"
              className="w-[180px]"
            />
            <p className="text-3xl font-bold">Sunny</p>
          </div>
        </div>
        <div
          id="end"
          className="w-[33%] h-full flex flex-col items-center justify-center gap-4"
        >
          <div className="w-full h-[40%] flex justify-between items-center mt-4">
            <div className="flex flex-col items-center justify-center w-[50%] gap-2">
              <div className="flex flex-col items-center gap-2">
                <img src={humidity} alt="humdity" className="size-[35px]" />
                <p className="text-md font-bold">
                  {currentDayData.main.humidity}%
                </p>
              </div>
              <p className="text-sm">Humidity</p>
            </div>
            <div className="flex flex-col items-center justify-center w-[50%] gap-2">
              <div className="flex flex-col items-center gap-2">
                <img src={wind} alt="wind" className="size-[35px]" />
                <p className="text-md font-bold">
                  {Math.floor(currentDayData.wind.speed)}km/h
                </p>
              </div>
              <p className="text-sm">Wind Speed</p>
            </div>
          </div>
          <div className="w-full h-[40%] flex justify-between items-center">
            <div className="flex flex-col items-center justify-center w-[50%] gap-2">
              <div className="flex flex-col items-center gap-2">
                <img src={pressure} alt="humdity" className="size-[35px]" />
                <p className="text-md font-bold">
                  {currentDayData.main.pressure}hPa
                </p>
              </div>
              <p className="text-sm">Pressure</p>
            </div>
            <div className="flex flex-col items-center justify-center w-[50%] gap-2">
              <div className="flex flex-col items-center gap-2">
                <img src={uv} alt="wind" className="size-[35px]" />
                <p className="text-md font-bold">
                  {Math.floor(Math.random() * 5)}
                </p>
              </div>
              <p className="text-sm">UV</p>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

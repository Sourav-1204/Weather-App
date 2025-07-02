import React, { useContext } from "react";
import { WeatherContext } from "../context/globalstate";
import { RxDividerVertical } from "react-icons/rx";
import "./forecast.css";

export default function Forcast() {
  const { forecastData, loading, formDate } = useContext(WeatherContext);

  return (
    <div className="w-full h-full flex flex-col items-center custom-scroll overflow-y-auto">
      <p className="text-2xl font-bold my-3">5 Days Forecast:</p>
      <div className="w-[95%] flex flex-col items-center mb-2 space-y-2">
        {!loading && forecastData
          ? forecastData.slice(1).map((item) => (
              <div
                key={item.dt}
                className="w-[95%] flex justify-between items-center bg-[#6161611a] rounded-[20px] pr-1"
              >
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt={item.weather[0].main}
                  className="size-15"
                />
                <div className="w-[10%] flex justify-center">
                  <p className="text-xl font-bold">
                    {Math.floor(item.main.temp)}°C
                  </p>
                </div>
                <div className="w-[44%] flex justify-center">
                  <p className="font-medium">
                    {formDate(item.dt_txt.split(" ")[0])}
                  </p>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

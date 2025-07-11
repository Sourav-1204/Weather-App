import React, { useContext } from "react";
import { WeatherContext } from "../context/globalstate";
import windNav from "../../assets/wind-direction.png";

export default function HourlyForecast() {
  const { loading, hourlyForecast, formDate } = useContext(WeatherContext);

  return (
    <div className="size-full flex flex-col items-center">
      <p className="text-2xl font-bold my-3">Hourly Forecast:</p>
      <div className="w-[83%] md:w-[70%] md:h-[75%] flex items-center justify-between gap-2 pl-1 overflow-x-scroll custom-scroll my-3 md:mb-2">
        {!loading && hourlyForecast.length > 0
          ? hourlyForecast.map((item, ind) => (
              <div
                className={`w-[30%] md:h-[100%] h-[220px] rounded-[30px] flex flex-col items-center justify-center px-3 py-1 ${
                  ind > 4
                    ? "bg-[linear-gradient(150deg,_#443d64,_#6582c6)]"
                    : "bg-[linear-gradient(150deg,_#f88408,_#f6fad9)]"
                } `}
                key={item.dt}
              >
                <p className="text-xl font-bold">
                  {item.dt_txt.split(" ")[1].slice(0, 5)}
                </p>
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt={item.weather[0].main}
                  className="md:size-[50px]"
                />
                <p className="text-lg font-bold">
                  {Math.floor(item.main.temp)}°C
                </p>
                <img
                  src={windNav}
                  alt=""
                  className={`size-[40px]`}
                  style={{ transform: `rotate(${item.wind.deg}deg)` }}
                />
                <p className="font-semibold">{item.wind.speed}km/h</p>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

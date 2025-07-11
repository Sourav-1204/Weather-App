import React, { useContext, useState } from "react";
import Navbar from "./navbar";
import Main from "./main";
import { WeatherContext } from "../context/globalstate";

export default function Dashboard() {
  const { cityName, currentDayData, error, loading } =
    useContext(WeatherContext);

  return (
    <div
      id="dashboard-main"
      className="w-full h-full flex flex-col items-center"
    >
      <Navbar />
      {currentDayData ? (
        <Main />
      ) : error ? (
        <p className="text-8xl mt-15 text-[#292929]">
          OOPS! Search for a city.
        </p>
      ) : loading ? (
        <p className="text-5xl mt-15px text-[#292929]">Loading data! please wait...</p>
      ) : (
        <p className="h-[80vh] w-full text-8xl mt-15 text-[#292929]">OOPS! Nothing to show.</p>
      )}
    </div>
  );
}

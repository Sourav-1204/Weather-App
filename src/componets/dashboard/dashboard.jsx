import React, { useContext, useState } from "react";
import Navbar from "./navbar";
import Main from "./main";
import { WeatherContext } from "../context/globalstate";

export default function Dashboard() {

  const {cityName } = useContext(WeatherContext);
  
  return (
    <div
      id="dashboard-main"
      className="w-full h-full flex flex-col items-center"
    >
      <Navbar />
      {cityName ? (
        <Main />
      ) : (
        <p className="text-8xl mt-15 text-[#292929]">OOPS! Search for a city.</p>
      )}
    </div>
  );
}

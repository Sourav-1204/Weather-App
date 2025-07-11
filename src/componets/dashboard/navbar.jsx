import React, { useContext, useState } from "react";
import "./navbar.css";
import { FiSearch } from "react-icons/fi";
import { TbCurrentLocation } from "react-icons/tb";
import { CiLocationOn } from "react-icons/ci";
import { WeatherContext } from "../context/globalstate";

export default function Navbar() {
  const { cityName, setCityName } = useContext(WeatherContext);
  const [inputValue, setInputValue] = useState("");

  function handleEnterPress(e) {
    if (e.key === "Enter" && inputValue !== "") {
      setCityName(inputValue);
      setInputValue("");
    }
  }
  return (
    <div className="w-[80%] flex items-center h-[50px] bg-red justify-between mt-[40px]">
      <div className="md:size-full flex items-center justify-between">
        <label className="ui-switch">
          <input type="checkbox" />
          <div className="slider">
            <div className="circle"></div>
          </div>
        </label>
        <div className="px-3 py-1.5 bg-[var(--main-color)] w-[70%] md:w-[50%] rounded-full outline-0 flex items-center shadow-[0px_2px_15px_#5D5C5C]">
          <FiSearch size="30px" className="w-[10%] text-[#777777]" />
          <input
            type="text"
            value={inputValue}
            placeholder="Search city..."
            className="w-[80%] outline-0 text-black placeholder-black"
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleEnterPress}
          />
        </div>
        <button className="flex rounded-full items-center px-5 py-2 gap-2 bg-[#4CBB17] text-[#e5e5e5] font-medium shadow-[0px_2px_15px_#5D5C5C] hide">
          <span className="text-[#464646] text-2xl font-thin">
            <CiLocationOn />
          </span>
          Current location
        </button>
      </div>
      <div>

      </div>
    </div>
  );
}

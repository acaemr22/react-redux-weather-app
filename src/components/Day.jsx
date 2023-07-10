import React from "react";
import Icon from "./Icon";

const Day = ({ day, mainObj, main, dt_txt, firDay }) => {
  return (
    <div
      className={`bg-white px-5 py-2 rounded-lg relative ${
        firDay === day ? "hidden" : ""
      }`}
    >
      <div className="text-center font-semibold">{day.slice(0, 3)}</div>
      <div className="flex items-center justify-center">
        <Icon main={main} size={80} />
      </div>
      <div className="flex flex-row items-center justify-center">
        <span>{mainObj.temp_min.toFixed()}°</span>
        <span className="text-gray-400">/{mainObj.temp_max.toFixed()}°</span>
      </div>
      <div className="text-center">{new Date(dt_txt).getHours()}:00</div>
    </div>
  );
};

export default Day;

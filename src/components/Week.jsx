import React from "react";
import Day from "./Day";
import { useSelector } from "react-redux";

const Week = () => {
  const weatherData = useSelector((state) => state.weather.weatherData);
  const fetchDataStatus = useSelector((state) => state.weather.fetchDataStatus);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const firDay = weatherData?.list
    ? days[new Date(weatherData.list[0].dt_txt).getDay()]
    : "";

  return (
    <div className="flex flex-col sm:py-0 px-2 sm:px-5">
      <h2 className="text-center font-semibold text-3xl">Week</h2>
      <div
        className={`sm:flex sm:flex-row items-center py-5 pt-7 px-5 gap-5 grid-rows-3 grid-flow-col grid ${
          fetchDataStatus !== "pending" && "overflow-x-scroll hor-scroll"
        }`}
      >
        {/* <Chip color="info" deleteIcon={<DoneIcon />} onDelete={handleDelete} /> */}
        {weatherData?.list &&
          weatherData.list.map((item, index) => (
            <Day
              day={days[new Date(item.dt_txt).getDay()]}
              mainObj={item.main}
              main={item.weather[0].main}
              dt_txt={item.dt_txt}
              key={index}
              firDay={firDay}
            />
          ))}
      </div>
    </div>
  );
};

export default Week;

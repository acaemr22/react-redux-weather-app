import React from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { CircularProgress } from "@mui/material";

const Error = ({ message }) => {
  return (
    <main className="flex flex-col items-center justify-center dark:bg-[#1B262C] h-screen w-screen">
      <div className="flex flex-col h-full items-center justify-center gap-y-1">
        <form
          className="flex-row flex items-center justify-center gap-x-5"
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <div className="flex-row flex items-center gap-x-2 sm:w-auto">
            {fetchGeoStatus === "pending" ? (
              <CircularProgress size={16} className="" />
            ) : (
              <MagnifyingGlass
                size={22}
                className="flex flex-row items-center justify-center"
              />
            )}
            <input
              type="text"
              id="search-places"
              value={search}
              onChange={handleChange}
              placeholder={
                weatherData?.city
                  ? `${weatherData.city?.name}, ${weatherData.city?.country}`
                  : "Search for places..."
              }
              className="p-1 outline-none dark:bg-[#1B262C] border-none dark:text-white dark:placeholder:text-white placeholder:text-black w-48 lg:w-auto"
            />
          </div>
          <div
            className="rounded-full hover:text-[#9DB2BF] dark:bg-[#0F4C75] bg-gray-100 p-2 cursor-pointer"
            onClick={handleUserLocation}
          >
            <CrosshairSimple size={22} />
          </div>
        </form>
        <div className="relative flex items-start justify-start w-72">
          <div
            className={`bg-gray-100 dark:bg-[#BBE1FA] cursor-pointer w-full absolute z-1 font-semibold flex justify-center flex-col overflow-clip rounded-lg ${
              !search && geoData ? "hidden" : ""
            }`}
          >
            {JSON.stringify(geoData) !== "[]" ? (
              geoData.map((data, index) => (
                <option
                  onMouseOver={() => handleMouseOver(index)}
                  key={index}
                  onClick={() => geoData && handleClick(geoData[index])}
                  className={`p-1 pl-3 rounded-md ${
                    sendIndex === index
                      ? "bg-[#9DB2BF] dark:bg-[#3282B8] text-white"
                      : "hover:text-white dark:bg-[#BBE1FA] dark:text-black hover:bg-[#3282B8]"
                  }  text-ellipsis overflow-hidden whitespace-nowrap`}
                >
                  {data.name}, {data.country}
                </option>
              ))
            ) : (
              <div>
                {fetchGeoStatus === "pending" ? (
                  <div className="p-1 pl-3 dark:bg-[#BBE1FA] dark:text-black rounded-md font-normal italic">
                    Loading...
                  </div>
                ) : (
                  <div className="p-1 pl-3 dark:bg-[#BBE1FA] dark:text-black rounded-md font-normal italic">
                    No place found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Error;

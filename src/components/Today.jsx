import { useState, useRef, useEffect } from "react";
import { MagnifyingGlass, CrosshairSimple } from "@phosphor-icons/react";
import { CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchData, fetchGeo } from "../features/weatherSlice";
import Icon from "./Icon";

const Today = () => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);

  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const fetchGeoStatus = useSelector((state) => state.weather.fetchGeo.status);
  const geoData = useSelector((state) => state.weather.geoData);
  const weatherData = useSelector((state) => state.weather.weatherData);
  const formRef = useRef(null);
  const [sendIndex, setSendIndex] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.length > 1) {
      setSearch("");
      dispatch(fetchData(geoData[sendIndex]));
      setSendIndex(0);
    }
  };

  const handleClick = ({ lat, lon }, name) => {
    setSearch("");
    dispatch(fetchData({ lat, lon }));
    setSendIndex(0);
  };

  const handleUserLocation = () => {
    if ("geolocation" in navigator) {
      // Prompt user for permission to access their location
      navigator.geolocation.getCurrentPosition(
        // Success callback function
        (position) => {
          // Get the user's latitude and longitude coordinates
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          dispatch(fetchData({ lat, lon: lng }));

          // Do something with the location data, e.g. display on a map
          console.log(`Latitude: ${lat}, longitude: ${lng}`);
        },
        // Error callback function
        (error) => {
          // Handle errors, e.g. user denied location sharing permissions
          alert(
            "We cannot access your location. Please be sure that you allowed us to know your location."
          );
          console.error("Error getting user location:", error);
        }
      );
    } else {
      // Geolocation is not supported by the browser
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleChange = (e) => {
    if (e.target.value.length < 30) {
      setSearch(e.target.value);
      setSendIndex(0);
      dispatch(fetchGeo(e.target.value));
    }
  };

  const handleMouseOver = (index) => {
    setSendIndex(index);
  };

  return (
    <div className="flex flex-col dark:text-white lg:h-full w-full lg:w-2/5 xl:w-1/4 py-10">
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
              autoComplete="off"
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
                  onClick={() => geoData && handleClick(data, data.name)}
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
      {JSON.stringify(weatherData) !== "{}" && (
        <div className="flex flex-col h-full lg:justify-normal items-center justify-center">
          <div className="flex flex-col items-center">
            <Icon
              main={weatherData.list[0].weather[0].main}
              size={screenSize.width < 1024 ? 200 : 255}
              viewBox={
                screenSize.width < 1024 ? "15 10 120 120" : "15 10 120 120"
              }
            />
          </div>
          {/* Temperature */}
          <div className="flex flex-row pt-5 ">
            <span className="font-light text-7xl md:text-8xl">
              {weatherData.list[0].main.temp.toFixed(0)}
            </span>
            <span className="text-2xl py-2">℃</span>
          </div>
          {/* Day and Hour */}
          <div className="flex flex-row justify-center lg:px-10 py-8 text-lg items-center">
            <span className="font-semibold">
              {days[new Date(weatherData.list[0].dt_txt).getDay()]},
            </span>
            <pre> </pre>
            <span className="text-gray-500 flex items-center">
              {new Date(weatherData.list[0].dt_txt).getHours()}:00
            </span>
          </div>
          <div className="w-full px-10 md:px-56 lg:px-10">
            <hr />
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="py-5 flex items-center justify-center font-semibold text-2xl">
              {weatherData.list[0].weather[0].description
                .split(" ")
                .map((str) => str[0].toUpperCase() + str.slice(1))
                .join(" ")}
            </div>
            <div className="flex flex-row gap-x-2">
              <div>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  className="text-blue-500 text-2xl"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path
                      fillRule="nonzero"
                      d="M8 5a4 4 0 1 1 8 0v5.255a7 7 0 1 1-8 0V5zm1.144 6.895a5 5 0 1 0 5.712 0L14 11.298V5a2 2 0 1 0-4 0v6.298l-.856.597zm1.856.231V5h2v7.126A4.002 4.002 0 0 1 12 20a4 4 0 0 1-1-7.874zM12 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                    ></path>
                  </g>
                </svg>
              </div>
              <div className="flex flex-row font-semibold text-md">
                Feels Like:<pre> </pre>
                <span> {weatherData.list[0].main.feels_like.toFixed(0)}</span>
                <span className="">℃</span>
              </div>
            </div>
            <div className="flex flex-row gap-x-2">
              <div>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  className="text-blue-500 text-2xl"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M10.5 17H4v-2h6.5a3.5 3.5 0 1 1-3.278 4.73l1.873-.703A1.5 1.5 0 1 0 10.5 17zM5 11h13.5a3.5 3.5 0 1 1-3.278 4.73l1.873-.703A1.5 1.5 0 1 0 18.5 13H5a3 3 0 0 1 0-6h8.5a1.5 1.5 0 1 0-1.405-2.027l-1.873-.702A3.501 3.501 0 0 1 17 5.5 3.5 3.5 0 0 1 13.5 9H5a1 1 0 1 0 0 2z"></path>
                  </g>
                </svg>
              </div>
              <div className="flex flex-row font-semibold text-md">
                Wind Speed:<pre> </pre>
                <span>{weatherData.list[0].wind.speed.toFixed(0)}</span>
                <span className="">km/h</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Today;

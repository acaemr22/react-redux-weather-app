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
    console.log("resized");
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

  const handleClick = ({ lat, lon }) => {
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
            "We cannot access your location. Please be sure that you allowed sites to know location."
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
    <div className="flex flex-col lg:h-full w-full lg:w-2/5 xl:w-1/4 py-5 h-screen">
      <div className="flex flex-col items-center justify-center gap-y-1">
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
              className="p-1 outline-none placeholder:text-black w-48 lg:w-auto shadow-[inset_0_0_0px_1000px_rgb(255,255,255)]"
            />
          </div>
          <div
            className="rounded-full hover:text-[#9DB2BF] bg-gray-100 p-2 cursor-pointer"
            onClick={handleUserLocation}
          >
            <CrosshairSimple size={22} />
          </div>
        </form>
        <div className="relative flex items-start justify-start w-72">
          <div
            className={`bg-gray-100 cursor-pointer w-full absolute z-1 font-semibold flex justify-center flex-col overflow-clip rounded-lg ${
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
                      ? "bg-[#9DB2BF] text-white"
                      : "hover:text-white hover:bg-[#9DB2BF]"
                  }  text-ellipsis overflow-hidden whitespace-nowrap`}
                >
                  {data.name}, {data.country}
                  {"\n"}
                </option>
              ))
            ) : (
              <div
                onClick={() => geoData && handleClick(geoData[index])}
                className="p-1 pl-3 rounded-md font-normal italic"
              >
                No place found
              </div>
            )}
          </div>
        </div>
      </div>
      {JSON.stringify(weatherData) !== "{}" && (
        <div className="flex flex-col lg:justify-normal items-center justify-center">
          <div className="flex flex-col items-center">
            <Icon
              main={weatherData.list[0].weather[0].main}
              size={screenSize.width < 768 ? 200 : 255}
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
              {days[new Date(weatherData.list[0].dt_txt).getDay().toFixed()]},
            </span>
            <pre> </pre>
            <span className="text-gray-500 flex items-center">
              {new Date(weatherData.list[0].dt_txt).getHours()}:00
            </span>
          </div>
          <div className="w-full px-10">
            <hr />
          </div>
          <div className="py-5 font-semibold text-2xl">
            {weatherData.list[0].weather[0].description
              .split(" ")
              .map((str) => str[0].toUpperCase() + str.slice(1))
              .join(" ")}
          </div>
        </div>
      )}
    </div>
  );
};

export default Today;

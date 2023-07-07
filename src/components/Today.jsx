import { useState, useRef } from "react";
import { MagnifyingGlass, CrosshairSimple } from "@phosphor-icons/react";
import { CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchData, fetchGeo } from "../features/weatherSlice";

const Today = () => {
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
    <div className="flex flex-col items-center">
      <div className="flex flex-col gap-y-1">
        <form
          className="flex-row flex items-center justify-center gap-x-5"
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <div className="flex-row flex items-center  gap-x-2">
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
              className="p-1 outline-none placeholder:text-black md:w-3/4 shadow-[inset_0_0_0px_1000px_rgb(255,255,255)]"
            />
          </div>
          <div
            className="rounded-full hover:text-[#9DB2BF] bg-gray-100 p-2 cursor-pointer"
            onClick={handleUserLocation}
          >
            <CrosshairSimple size={22} />
          </div>
        </form>
        <div
          className={`bg-gray-100 cursor-pointer font-semibold flex justify-center flex-col overflow-clip rounded-lg ${
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
      <div>{JSON.stringify(weatherData.city, null, 2)}</div>
    </div>
  );
};

export default Today;

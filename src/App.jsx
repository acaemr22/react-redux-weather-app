import { useEffect, useState } from "react";
import "./App.css";
import { fetchGeo, fetchData } from "./features/weatherSlice";
import { useDispatch, useSelector } from "react-redux";
import Today from "./components/Today";
import TodayDetails from "./components/TodayDetails";
import Week from "./components/Week";

function App() {
  const dispatch = useDispatch();
  const geoData = useSelector((state) => state.weather.geoData);
  const weatherData = useSelector((state) => state.weather.weatherData);
  const fetchGeoStatus = useSelector((state) => state.weather.fetchGeo.status);
  const fetchDataStatus = useSelector(
    (state) => state.weather.fetchData.status
  );
  useEffect(() => {
    if (
      JSON.stringify(geoData) === "{}" &&
      fetchDataStatus === "idle" &&
      (geoData[0]?.lan ?? null)
      ) {
      // When application started it will try to fetch weather data for Istanbul
      // dispatch(fetchData({ lat: 41.0091982, lon: 28.9662187, location: geoData[0].name, changeLocation: false }));
    }
  }, []);

  return (
    <main className="flex flex-row items-center justify-center w-full h-full">
      <Today />
      <div className="flex flex-col bg-gray-100">
        <Week />
        <TodayDetails />
      </div>
    </main>
  );
}

export default App;

import { useEffect, useState } from "react";
import "./App.css";
import { fetchGeo, fetchData } from "./features/weatherSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const geoData = useSelector((state) => state.weather.geoData);
  const weatherData = useSelector((state) => state.weather.weatherData);
  const fetchGeoStatus = useSelector((state) => state.weather.fetchGeo.status);
  const fetchDataStatus = useSelector(
    (state) => state.weather.fetchData.status
  );
  useEffect(() => {
    if (fetchDataStatus === "idle") {
      dispatch(fetchGeo("Istabul"));
    }
    if (
      JSON.stringify(geoData) === "{}" &&
      fetchGeoStatus === "idle" &&
      (geoData[0]?.lan ?? null)
    ) {
      dispatch(fetchData({ lan: geoData[0].lan, lon: geoData[0].lon }));
    }
  }, []);

  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen">

    </main>
  );
}

export default App;

import { useEffect, useState } from "react";
import "./App.css";
import { Button } from "@mui/material";
import { fetchGeo } from "./features/weatherSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch();
  });
  const geoData = useSelector((state) => state.weather.geoData);
  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen">
      {/* {JSON.stringify(geoData, null, 2)} */}
      <div>
        <Button variant="contained">Hello World</Button>
      </div>
      <div></div>
    </main>
  );
}

export default App;

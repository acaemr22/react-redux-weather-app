import { useEffect } from "react";
import { fetchData } from "./features/weatherSlice";
import { useDispatch, useSelector } from "react-redux";
import Today from "./components/Today";
import TodayDetails from "./components/TodayDetails";
import Week from "./components/Week";
import { CircularProgress } from "@mui/material";

function App() {
  const dispatch = useDispatch();
  const fetchDataStatus = useSelector(
    (state) => state.weather.fetchData.status
  );
  useEffect(() => {
      // When application started it will try to fetch weather data for Istanbul
      dispatch(fetchData({ lat: 41.0091982, lon: 28.9662187 }));
  }, []);

  return (
    <main
      className={`flex flex-col lg:flex-row justify-center w-full h-full relative ${
        fetchDataStatus === "pending" && "h-screen"
      }`}
    >
      {fetchDataStatus === "pending" && (
        <div className="flex items-center justify-center w-full h-full py-10 absolute">
          <CircularProgress />
        </div>
      )}

      <Today />
      <div className="flex flex-col bg-gray-100 lg:w-3/5 xl:w-3/4 h-full py-10 w-full lg:px-10">
        <Week />
        <div className="py-10 lg:py-5 scale-x-[.15] px-24">
          <hr className="border-2 lg:hidden border-gray-400" />
        </div>
        <TodayDetails />
      </div>
    </main>
  );
}

export default App;

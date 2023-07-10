import { useEffect } from "react";
import { changeTheme, fetchData } from "./features/weatherSlice";
import { useDispatch, useSelector } from "react-redux";
import Today from "./components/Today";
import TodayDetails from "./components/TodayDetails";
import Week from "./components/Week";
import { CircularProgress } from "@mui/material";
import { Sun } from "@phosphor-icons/react";
import { Moon } from "@phosphor-icons/react";
import { Desktop } from "@phosphor-icons/react";

function App() {
  const dispatch = useDispatch();
  const fetchDataStatus = useSelector(
    (state) => state.weather.fetchData.status
  );
  const theme = useSelector((state) => state.weather.theme);

  

  useEffect(() => {
    // When application started it will try to fetch weather data for Istanbul
    dispatch(fetchData({ lat: 41.0091982, lon: 28.9662187 }));
  }, []);

  const handleOSTheme = () => {
    dispatch(changeTheme("OS"));
  };

  const handleDarkTheme = () => {
    dispatch(changeTheme("dark"));
  };
  const handleLightTheme = () => {
    dispatch(changeTheme("light"));
  };

  return (
    <main
      className={`flex flex-col lg:flex-row justify-center dark:bg-[#1B262C] w-full h-full relative ${
        fetchDataStatus === "pending" && "h-screen"
      }`}
    >
      {fetchDataStatus === "pending" && (
        <div className="flex items-center justify-center w-full h-full py-10 absolute">
          <CircularProgress />
        </div>
      )}

      <Today />
      <div className="flex flex-col dark:bg-[#0F4C75] dark:text-white bg-gray-100 lg:w-3/5 xl:w-3/4 h-full py-10 w-full lg:px-10">
        <Week />
        <div className="py-10 lg:py-5 scale-x-[.15] px-24">
          <hr className="border-2 lg:hidden border-gray-400" />
        </div>
        <TodayDetails />
        <div className="flex flex-col-reverse gap-y-5 sm:flex-row items-center justify-around">
          <div>Copyright (c) 2023 Emre Açar</div>
          <div className="flex flex-row gap-x-5">
            <a
              href="https://github.com/acaemr22"
              target="_blank"
              className="flex flex-row items-center justify-center gap-x-2 text-white text-md bg-blue-600 p-2 px-3 rounded-lg hover:bg-blue-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                className="bi bi-github"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
              Github
            </a>
            <a
              href="https://github.com/acaemr22/react-redux-weather-app"
              target="_blank"
              className="flex flex-row items-center justify-center gap-x-2 text-white text-md bg-orange-600 p-2 px-3 rounded-lg hover:bg-orange-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-code-slash"
                viewBox="0 0 16 16"
              >
                <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z" />
              </svg>
              Code
            </a>
          </div>
          <div className="flex-row flex border p-1 gap-x-1 rounded-full">
            <div
              onClick={handleLightTheme}
              className={`p-1 rounded-full hover:cursor-pointer ${
                theme === "light" && "bg-gray-300/90 dark:bg-[#3282B8]"
              }`}
            >
              <Sun size={24} />
            </div>
            <div
              onClick={handleDarkTheme}
              className={`p-1 rounded-full hover:cursor-pointer ${
                theme === "dark" && "bg-gray-300/90 dark:bg-[#3282B8]"
              }`}
            >
              <Moon size={24} />
            </div>
            <div
              className={`p-1 rounded-full hover:cursor-pointer ${
                theme === "OS" && "bg-gray-300/90 dark:bg-[#3282B8]"
              }`}
              onClick={handleOSTheme}
            >
              <Desktop size={24} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;

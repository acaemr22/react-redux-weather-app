import { useEffect } from "react";
import { useSelector } from "react-redux";

const Theme = ({ children }) => {
  const theme = useSelector((state) => state.weather.theme);

  return (
    <div
      className={
        theme === "dark" ||
        (theme === "OS" &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
          ? "dark"
          : ""
      }
    >
      {children}
    </div>
  );
};

export default Theme;

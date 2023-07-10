import { style } from "@mui/system";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Theme = ({ children }) => {
  const theme = useSelector((state) => state.weather.theme);
  const darkCSS = `input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus {
    -webkit-text-fill-color: #fff;
    color: #fff;
    caret-color: #fff;
    /* -webkit-box-shadow: 0 0 0px 1000px #1b1b6c inset; */
    background-color: #1b262c;
    transition: background-color 5000s ease-in-out 0s;
  }
  `;

  const CSS = `input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus {
    -webkit-text-fill-color: #000;
    color: #000;
    caret-color: #000;
    /* -webkit-box-shadow: 0 0 0px 1000px #1b1b6c inset; */
    background-color: #fff;
    transition: background-color 5000s ease-in-out 0s;
  }
  `;

  return (
    <div
      className={`${
        theme === "dark" ||
        (theme === "OS" &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
          ? "dark"
          : ""
      }`}
    >
      {theme === "dark" ||
      (theme === "OS" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches) ? (
        <style>{darkCSS}</style>
      ) : (
        <style>{CSS}</style>
      )}

      {children}
    </div>
  );
};

export default Theme;

import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGeo = createAsyncThunk("weather/fetchGeo", async (city) => {
  const res = await axios(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${VITE_OPEN_WEATHER_API_KEY}`
  );
  return res.data;
});

export const fetchData = createAsyncThunk(
  "weather/fetchData",
  async ({ lat, lon }) => {
    const res = await axios(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${VITE_OPEN_WEATHER_API_KEY}`
    );
    return { data: res.data };
  }
);

export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    theme:
      localStorage.getItem("theme") ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "OS" : "OS"),
    weatherData: {},
    geoData: [],
    fetchGeo: {
      status: "idle",
      error: "",
    },
    fetchData: {
      status: "idle",
      error: "",
    },
  },
  reducers: {
    changeTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGeo.fulfilled, (state, action) => {
        state.geoData = action.payload;
        state.fetchGeo.status = "succeeded";
      })
      .addCase(fetchGeo.rejected, (state, action) => {
        state.fetchGeo.error = action.error.message;
        state.fetchGeo.status = "failed";
      })
      .addCase(fetchGeo.pending, (state, action) => {
        state.fetchGeo.status = "pending";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.weatherData = action.payload.data;
        state.fetchData.status = "succeeded";
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.fetchData.error = action.error.message;
        state.fetchData.status = "failed";
      })
      .addCase(fetchData.pending, (state, action) => {
        state.fetchData.status = "pending";
      });
  },
});

export default weatherSlice.reducer;
export const { changeTheme } = weatherSlice.actions;

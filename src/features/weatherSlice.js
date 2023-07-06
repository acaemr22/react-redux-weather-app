import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGeo = createAsyncThunk("weather/fetchGeo", async (city) => {
  const res = await axios(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${
      import.meta.env.VITE_OPEN_WEATHER_API_KEY
    }`
  );
  console.log(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${
      import.meta.env.VITE_OPEN_WEATHER_API_KEY
    }`
  );

  return res.data;
});

export const fetchData = createAsyncThunk(
  "weather/fetchData",
  async ({ lat, lon }) => {
    const res = await axios(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=current,hourly,daily{part}&appid=${
        import.meta.env.VITE_OPEN_WEATHER_API_KEY
      }`
    );
    return res.data;
  }
);

export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    weatherData: {},
    geoData: {},
    fetchGeo: {
      status: "idle",
      error: "",
    },
    fetchData: {
      status: "idle",
      error: "",
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGeo.fulfilled, (state, action) => {
        state.geoData = action.payload;
        console.log(action);
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
        state.weatherData = action.payload;
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

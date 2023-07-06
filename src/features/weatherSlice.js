import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGeo = createAsyncThunk("weather/fetchGeo", async (city) => {
  const res = await axios(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=116a56ac9d0e561c9476421bebe45deb`
  );

  return res.data;
});

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
      })
      .addCase(fetchGeo.rejected, (state, action) => {
        state.fetchGeo.error = action.error.message;
      })
      .addCase(fetchGeo.pending, (state, action) => {
        state.fetchGeo.status = "pending";
      });
  },
});

export default weatherSlice.reducer;

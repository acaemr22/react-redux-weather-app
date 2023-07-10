import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGeo = createAsyncThunk("weather/fetchGeo", async (city) => {
  const res = await axios(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${
      import.meta.env.VITE_OPEN_WEATHER_API_KEY
    }`
  );
  console.log(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${
      import.meta.env.VITE_OPEN_WEATHER_API_KEY
    }`
  );

  return res.data;
});

export const fetchData = createAsyncThunk(
  "weather/fetchData",
  async ({ lat, lon }) => {
    const res = await axios(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${
        import.meta.env.VITE_OPEN_WEATHER_API_KEY
      }`
    );
    console.log(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${
        import.meta.env.VITE_OPEN_WEATHER_API_KEY
      }`
    );
    return { data: res.data };
  }
);

export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    weatherData: {},
    geoData: [
      {
        name: "London",
        local_names: {
          ug: "لوندۇن",
          ms: "London",
          tg: "Лондон",
          hy: "Լոնդոն",
          tr: "Londra",
          bm: "London",
          fa: "لندن",
          gu: "લંડન",
          kk: "Лондон",
          my: "လန်ဒန်မြို့",
          mt: "Londra",
          tl: "Londres",
          os: "Лондон",
          ee: "London",
          et: "London",
          pa: "ਲੰਡਨ",
          mk: "Лондон",
          fr: "Londres",
          mi: "Rānana",
          sv: "London",
          tw: "London",
          oc: "Londres",
          nl: "Londen",
          wa: "Londe",
          ky: "Лондон",
          kw: "Loundres",
          lt: "Londonas",
          nv: "Tooh Dineʼé Bikin Haalʼá",
          eo: "Londono",
          lo: "ລອນດອນ",
          ascii: "London",
          so: "London",
          sc: "Londra",
          ca: "Londres",
          feature_name: "London",
          na: "London",
          tt: "Лондон",
          cs: "Londýn",
          si: "ලන්ඩන්",
          th: "ลอนดอน",
          lv: "Londona",
          id: "London",
          ba: "Лондон",
          it: "Londra",
          cy: "Llundain",
          es: "Londres",
          ps: "لندن",
          jv: "London",
          su: "London",
          gl: "Londres",
          av: "Лондон",
          fy: "Londen",
          kv: "Лондон",
          ja: "ロンドン",
          ia: "London",
          yi: "לאנדאן",
          gd: "Lunnainn",
          af: "Londen",
          kl: "London",
          az: "London",
          ga: "Londain",
          zu: "ILondon",
          co: "Londra",
          hi: "लंदन",
          cu: "Лондонъ",
          yo: "Lọndọnu",
          sq: "Londra",
          be: "Лондан",
          te: "లండన్",
          sk: "Londýn",
          hu: "London",
          fo: "London",
          ln: "Lóndɛlɛ",
          ta: "இலண்டன்",
          bi: "London",
          ro: "Londra",
          se: "London",
          vi: "Luân Đôn",
          ce: "Лондон",
          gv: "Lunnin",
          no: "London",
          fj: "Lodoni",
          he: "לונדון",
          ru: "Лондон",
          fi: "Lontoo",
          tk: "London",
          km: "ឡុងដ៍",
          nn: "London",
          sh: "London",
          pt: "Londres",
          bn: "লন্ডন",
          ku: "London",
          bo: "ལོན་ཊོན།",
          lb: "London",
          mn: "Лондон",
          uk: "Лондон",
          sa: "लन्डन्",
          bg: "Лондон",
          vo: "London",
          de: "London",
          ml: "ലണ്ടൻ",
          cv: "Лондон",
          uz: "London",
          rm: "Londra",
          en: "London",
          to: "Lonitoni",
          zh: "伦敦",
          bh: "लंदन",
          ny: "London",
          mr: "लंडन",
          ie: "London",
          sw: "London",
          ur: "علاقہ لندن",
          ne: "लन्डन",
          io: "London",
          an: "Londres",
          am: "ለንደን",
          eu: "Londres",
          hr: "London",
          ab: "Лондон",
          bs: "London",
          or: "ଲଣ୍ଡନ",
          ff: "London",
          sl: "London",
          sd: "لنڊن",
          li: "Londe",
          ka: "ლონდონი",
          ig: "London",
          ha: "Landan",
          el: "Λονδίνο",
          sn: "London",
          pl: "Londyn",
          ht: "Lonn",
          sr: "Лондон",
          sm: "Lonetona",
          da: "London",
          is: "London",
          mg: "Lôndôna",
          qu: "London",
          ay: "London",
          ar: "لندن",
          om: "Landan",
          gn: "Lóndyre",
          ko: "런던",
          wo: "Londar",
          st: "London",
          br: "Londrez",
          kn: "ಲಂಡನ್",
        },
        lat: 51.5073219,
        lon: -0.1276474,
        country: "GB",
        state: "England",
      },
      {
        name: "City of London",
        local_names: {
          he: "הסיטי של לונדון",
          zh: "倫敦市",
          pt: "Cidade de Londres",
          ko: "시티 오브 런던",
          es: "City de Londres",
          lt: "Londono Sitis",
          uk: "Лондонське Сіті",
          en: "City of London",
          fr: "Cité de Londres",
          hi: "सिटी ऑफ़ लंदन",
          ru: "Сити",
          ur: "لندن شہر",
        },
        lat: 51.5156177,
        lon: -0.0919983,
        country: "GB",
        state: "England",
      },
      {
        name: "London",
        local_names: {
          bn: "লন্ডন",
          iu: "ᓚᓐᑕᓐ",
          hy: "Լոնտոն",
          lv: "Landona",
          ja: "ロンドン",
          yi: "לאנדאן",
          oj: "Baketigweyaang",
          cr: "ᓬᐊᐣᑕᐣ",
          be: "Лондан",
          th: "ลอนดอน",
          he: "לונדון",
          ko: "런던",
          fa: "لندن",
          en: "London",
          el: "Λόντον",
          ar: "لندن",
          ru: "Лондон",
          fr: "London",
          lt: "Londonas",
          ga: "Londain",
          ka: "ლონდონი",
          ug: "لوندۇن",
        },
        lat: 42.9832406,
        lon: -81.243372,
        country: "CA",
        state: "Ontario",
      },
      {
        name: "Chelsea",
        local_names: {
          it: "Chelsea",
          pt: "Chelsea",
          ur: "چیلسی، لندن",
          af: "Chelsea, Londen",
          uk: "Челсі",
          ko: "첼시",
          de: "Chelsea",
          id: "Chelsea, London",
          en: "Chelsea",
          el: "Τσέλσι",
          fr: "Chelsea",
          he: "צ'לסי",
          hu: "Chelsea",
          es: "Chelsea",
          da: "Chelsea",
          fa: "چلسی",
          hi: "चेल्सी, लंदन",
          az: "Çelsi",
          ru: "Челси",
          eu: "Chelsea",
          ar: "تشيلسي",
          sk: "Chelsea",
          vi: "Chelsea, Luân Đôn",
          sv: "Chelsea, London",
          ga: "Chelsea",
          zh: "車路士",
          et: "Chelsea",
          no: "Chelsea",
          sh: "Chelsea, London",
          ja: "チェルシー",
          nl: "Chelsea",
          tr: "Chelsea, Londra",
          pl: "Chelsea",
        },
        lat: 51.4875167,
        lon: -0.1687007,
        country: "GB",
        state: "England",
      },
      {
        name: "London",
        lat: 37.1289771,
        lon: -84.0832646,
        country: "US",
        state: "Kentucky",
      },
    ],
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

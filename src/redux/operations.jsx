import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const WEATHER_KEY = '0abc45721ad688c0e4c9d58b6aaafd16';
const PHOTO_KEY = 'wSb8o-WE-cFULL5goFSuwBhp3ReYmy6OlEsTfXnez4I';
axios.defaults.baseURL = "https://api.openweathermap.org/data/2.5";

export const getCity = createAsyncThunk(
  'weather/fetchWeather',
  async ({ cityName }, thunkAPI) => {
    try {
      const response = await axios.get(`/weather?q=${cityName}&appid=${WEATHER_KEY}&units=metric`);
      console.log("data weather city:", response.data)
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const getWeather10Days = createAsyncThunk(
  'weather/getWeather10Days',
  async ({ cityName, cnt}, thunkAPI) => {
    try {
      const response = await axios.get(`/weather?q=${cityName}&cnt=${cnt}&appid=${WEATHER_KEY}&units=metric`);
      console.log("data weather:", response.data)
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);


export const getCurrentLocation = createAsyncThunk(
  'weather/getCurrentLocation',
  async ({ lat, lon }, thunkAPI) => {
    try {
      const response = await axios.get(`/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_KEY}&units=metric`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getCityPhoto = createAsyncThunk(
  'photo/getCityPhoto',
  async (cityName, thunkAPI) => {
    try {
      const response = await axios.get(`https://api.unsplash.com/search/photos?query=${cityName}&client_id=${PHOTO_KEY}`);
      return response.data.results[0];
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

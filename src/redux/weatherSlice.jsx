import { createSlice } from '@reduxjs/toolkit';
import { getCurrentLocation, getCity, getCityPhoto, getWeather10Days } from './operations';

const weatherInitialState = {
  city: null,
  cityPhoto:null,
  weather:[],
  isLoading: false,
  error: null,
};

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState: weatherInitialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCity.pending, handlePending)
      .addCase(getCity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.city = action.payload;
      })
      .addCase(getCity.rejected, handleRejected)
      .addCase(getCurrentLocation.pending, handlePending)
      .addCase(getCurrentLocation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.city = action.payload;
      })
      .addCase(getCurrentLocation.rejected, handleRejected)
      .addCase(getCityPhoto.pending, handlePending)
      .addCase(getCityPhoto.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.cityPhoto = action.payload;
      })
      .addCase(getWeather10Days.rejected, handleRejected)
      .addCase(getWeather10Days.pending, handlePending)
      .addCase(getWeather10Days.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.weather = action.payload;
      })
      .addCase(getCityPhoto.rejected, handleRejected)
  },
});

export const weatherReducer = weatherSlice.reducer;

import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCity, getCurrentLocation, getCityPhoto, getWeather10Days } from '../../redux/operations';
import ShowCity from '../ShowCity/ShowCity';
import WeatherSearch from '../WeatherSearch/WeatherSearch';
import { selectCity, selectCityPhoto, selectWeather } from '../../redux/selectors';
import css from './App.module.css';
import WeatherNextThenDays from '../NextThenDays/NextThenDays';

function App() {
  const dispatch = useDispatch();
  const weatherCity = useSelector(selectCity);
  const weather = useSelector(selectWeather);
  const photo = useSelector(selectCityPhoto);
  const [cityName, setCityName] = useState('');

  const setCityNameMemoized = useCallback((name) => {
    setCityName(name);
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const response = await dispatch(getCurrentLocation({ lat: latitude, lon: longitude }));
        if (response.payload && response.payload.name) {
          setCityName(response.payload.name);
        }
      },
      (error) => {
        console.error('Error fetching geolocation:', error);
      }
    );
  }, [dispatch]);

  useEffect(() => {
    if (cityName) {
      dispatch(getCity({ cityName }));
      dispatch(getCityPhoto(cityName));
      dispatch(getWeather10Days({cityName, cnt: 5}));
    }
  }, [dispatch, cityName]);

  const wrapperStyle = {
    backgroundImage: photo ? `url(${photo.urls.regular})` : 'url(https://images.unsplash.com/photo-1536514498073-50e69d39c6cf?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className={css.wrapper} style={wrapperStyle}>
      <WeatherSearch setCityNameProp={setCityNameMemoized} />
      {weatherCity && weatherCity.name && <ShowCity />}
      <WeatherNextThenDays/>
      
    </div>
  );
}

export default App;

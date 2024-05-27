import React from 'react';
import { useSelector } from 'react-redux';
import { selectCity} from '../../redux/selectors';
import css from './ShowCity.module.css';
import { AiFillSun } from "react-icons/ai";
import { FiSunrise } from "react-icons/fi";
import { FiSunset } from "react-icons/fi";


const ShowCity = () => {
  const cityWeather = useSelector(selectCity);

  const formatUnixTimestampToLocalTime = (unixTimestamp, timezoneOffset) => {
    const date = new Date((unixTimestamp + timezoneOffset) * 1000);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  if (!cityWeather) {
    return null;
  }

  const weatherDescription = cityWeather.weather[0].description;
  const isClearSky = weatherDescription.includes('clear');

  const weatherIconUrl = `http://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png`;

  return (
    <div className={css.wraperShowWeather}>
      <h2>{cityWeather.name}, {cityWeather.sys.country}</h2>
      <h2>{Math.floor(cityWeather.main.temp)}°C</h2>
      {isClearSky ? (
        <AiFillSun className={`${css.iconSun} ${css.iconApi}` } />
      ) : (
        <img src={weatherIconUrl} alt="Weather Icon" className={css.iconApi} />
      )}
      <p className={css.description}>{cityWeather.weather[0].description}</p>
      <div className={css.tempValue}>
      <p className={css.tempInt}>Min: <span>{Math.floor(cityWeather.main.temp_min)}°C</span></p>
      <p className={css.tempInt}>Max: <span>{Math.floor(cityWeather.main.temp_max)}°C</span></p>
      </div>
     <div className={css.containerIntervSun}>
     <p className={css.intervSunData}> <span><FiSunrise className={css.iconSunrise}/></span> {formatUnixTimestampToLocalTime(cityWeather.sys.sunrise, cityWeather.timezone)}</p>
      <p className={css.intervSunData}><span><FiSunset className={css.iconSunSet}/></span>{formatUnixTimestampToLocalTime(cityWeather.sys.sunset, cityWeather.timezone)}</p>
     </div>
      
    </div>
  );
};

export default ShowCity;

import React from "react";
import css from './NextThenDays.module.css';
import { useSelector } from "react-redux";
import { selectWeather5Days } from "../../redux/selectors";
import { AiFillSun } from 'react-icons/ai';

const WeatherNextFiveDays = () => {
  const nextDays = useSelector(selectWeather5Days);

  if (!nextDays || !Array.isArray(nextDays)) {
    return null;
  }
  const getDayInfo = nextDay => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return daysOfWeek[new Date(nextDay.dt_txt).getDay()];
  };
  
  return (
    <div className={css.wrapperNextDays}>
        <div className={css.titleWeapper}><h1>Next 5 days Weather Forecast</h1></div>
        <div className={css.wrapperNextDaysData}>
        {nextDays.map((nextDay) => (
        <div key={nextDay.dt} className={css.wraperShowWeather}>
            <h3>{getDayInfo(nextDay)}</h3>
          <span>{Math.floor(nextDay.main.temp)}°C</span>
          {nextDay.weather[0].description.includes('clear') ? (
            <AiFillSun className={`${css.iconSun} ${css.iconApi}`} />
          ) : (
            <img 
              src={`http://openweathermap.org/img/wn/${nextDay.weather[0].icon}@2x.png`}
              alt="Weather Icon" 
              className={css.iconApi} 
            />
          )}
          <p className={css.description}>{nextDay.weather[0].description}</p>
          <div className={css.containerIntValue}>
          <div className={css.tempValue}>
            <span className={css.tempInt}>Min</span> 
            <span className={css.dataTempInt}>{Math.floor(nextDay.main.temp_min)}°C</span>
            </div>
            <hr/>
            <div className={css.tempValue}>
            <span className={css.tempInt}>Max</span>
            <span className={css.dataTempInt}>{Math.floor(nextDay.main.temp_max)}°C</span>
            </div>
          </div>
        </div>
      ))}
        </div>
    </div>
  );
};

export default WeatherNextFiveDays;

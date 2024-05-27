import React from "react";
import css from './NextThenDays.module.css';
import { useSelector } from "react-redux";
import { selectWeather } from "../../redux/selectors";
import { AiFillSun } from 'react-icons/ai';

const WeatherNextThenDays = () => {
    const nextDays = useSelector(selectWeather);

    if (!nextDays || !Array.isArray(nextDays)) {
        return null; // sau afișează un mesaj de încărcare
    }

    return (
        <div>
            <h1>Next 5 days Weather Forecast</h1>
            {nextDays.map((cityWeather, index) => (
                <div key={index} className={css.wraperShowWeather}>
                    <h2>{cityWeather.name}, {cityWeather.sys.country}</h2>
                    <h2>{Math.floor(cityWeather.main.temp)}°C</h2>
                    {cityWeather.weather[0].description.includes('clear') ? (
                        <AiFillSun className={`${css.iconSun} ${css.iconApi}`} />
                    ) : (
                        <img src={`http://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png`}
                            alt="Weather Icon" className={css.iconApi} />
                    )}
                    <p className={css.description}>{cityWeather.weather[0].description}</p>
                    <div className={css.tempValue}>
                        <p className={css.tempInt}>Min: <span>{Math.floor(cityWeather.main.temp_min)}°C</span></p>
                        <p className={css.tempInt}>Max: <span>{Math.floor(cityWeather.main.temp_max)}°C</span></p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default WeatherNextThenDays;

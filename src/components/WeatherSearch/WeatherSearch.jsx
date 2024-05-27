import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCity } from '../../redux/operations';
import { selectError, selectIsLoading } from '../../redux/selectors';
import css from './WeatherSearch.module.css';

const WeatherSearch = ({ setCityNameProp }) => {
  const [cityName, setCityName] = useState('');
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const handleSearch = (e) => {
    e.preventDefault(); 
    dispatch(getCity({ cityName })).then((response) => {
      if (response.payload && response.payload.name) {
        setCityNameProp(response.payload.name);
      }
      setCityName('');
    });
  };

  return (
    <div className={css.wrapperInput}>
      <form className={css.flexWrapper} onSubmit={handleSearch}>
        <input
          type="text"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit" disabled={isLoading || !cityName}>
          Search
        </button>
      </form>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default WeatherSearch;

import React from 'react';

const WeatherTemperature = ({ indicator, handleIndicator, data }) => (
  <div className='weather-temperature'>
    {data.main !== undefined ? Math.round(data.main.temp) : 0}&deg; 
    <a
      onClick={() => {
        let new_indicator = indicator === 'c' ? 'f' : 'c';
        handleIndicator(new_indicator);
      }}
    >{indicator}</a>
  </div>
);

export default WeatherTemperature;
import React from 'react';

const getTemperature = (temp, unit) => {
  var roundTemp;

  switch(unit) {
    case 'f':
      roundTemp = temp * 9/5 + 32;
      break;
    case 'c':
    default:
      roundTemp = temp;
      break;
  }

  return Math.round(roundTemp)
}

const WeatherTemperature = ({ indicator, handleIndicator, data }) => (
  <div className='weather-temperature'>
    { 
      data.main !== undefined ? 
        getTemperature(data.main.temp, indicator)
        : 0
    }&deg; 
    <a
      onClick={() => {
        let new_indicator = indicator === 'c' ? 'f' : 'c';
        handleIndicator(new_indicator);
      }}
    >{indicator}</a>
  </div>
);

export default WeatherTemperature;
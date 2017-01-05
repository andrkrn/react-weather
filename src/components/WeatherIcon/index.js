import React from 'react';

const WeatherIcon = ({ weather }) => {
  if (weather !== undefined) {
    return (
      <div className='weather-icon'>
        <img src={`${getWeatherIcon(weather[0].icon)}`} alt={weather[0].description} width='96px' />
      </div>
    );
  } else {
    return null;
  }
}

function getWeatherIcon(code) {
  var image;

  switch (code) {
    case '01d':
    case '01n':
      image = 'images/sunny.png'
      break;
    case '02d':
    case '02n':
      image = 'images/sunny_s_cloudy.png'
      break;
    case '03d':
    case '03n':
      image = 'images/partly_cloudy.png'
      break;
    case '04d':
    case '04n':
      image = 'images/cloudy.png'
      break;
    case '09d':
    case '09n':
      image = 'images/rain.png'
      break;
    case '10d':
    case '10n':
      image = 'images/rain_s_cloudy.png'
      break;
    case '11d':
    case '11n':
      image = 'images/thunderstorms.png'
      break;
    case '13d':
    case '13n':
      image = 'images/snow.png'
      break;
    case '50d':
    case '50n':
      image = 'images/fog.png'
      break;
    default:
      image = 'images/sunny.png';
      break;
  }

  return image;
}

export default WeatherIcon;
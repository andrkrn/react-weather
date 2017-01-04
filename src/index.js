import React from 'react';
import ReactDOM from 'react-dom';

import WeatherApp from './components/WeatherApp';

import '../node_modules/normalize.css/normalize.css';
import './index.css';

ReactDOM.render(
  <WeatherApp />,
  document.getElementById('root')
);

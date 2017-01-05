import React from 'react';
import Geosuggest from 'react-geosuggest';

const WeatherSearch = ({ handleChangeLocation }) => (
  <Geosuggest onSuggestSelect={(suggest) => handleChangeLocation(suggest)} />
);

export default WeatherSearch;
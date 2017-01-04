import React, { Component } from 'react';
import $ from 'jquery';
import WeatherIcon from '../WeatherIcon';
import WeatherTemperature from '../WeatherTemperature';
import WeatherSearch from '../WeatherSearch';

import './WeatherApp.css';

class WeatherApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ip: '',
      latitude: '',
      longitude: '',
      data: {
        name: 'loading...',
        sys: {
          country: ''
        }
      },
      indicator: 'c'
    }
  }

  componentWillMount() {
    $.get({
      url: 'https://ipinfo.io/json',
      dataType: 'json',
      success: (data) => {
        let location = data.loc.split(',');
        this.setState({
          ip: data.ip,
          latitude: location[0],
          longitude: location[1]
        })
      }
    })

    console.log('Component Will Mount');
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.latitude !== '' &&
      this.state.longitude !== '' &&
      prevState.latitude !== this.state.latitude &&
      prevState.longitude !== this.state.longitude
    ) {
      $.get({
        url: 'http://api.openweathermap.org/data/2.5/weather',
        data: {
          lat: this.state.latitude,
          lon: this.state.longitude,
          units: 'metric',
          appid: 'fc0caf02803b8367527ba98cb6a095f5'
        },
        dataType: 'json',
        cache: true,
        success: (data) => {
          this.setState({ data: data })
        }
      })
    }
  }

  handleIndicator(indicator) {
    this.setState({
      indicator: indicator
    })
  }

  handleWeatherStatus() {
    let weather = '';
    if (this.state.data.weather !== undefined) {
      weather = this.state.data.weather[0].description;
    }
    return weather;
  }

  render() {
    return (
      <div className='weather-app'>
        <WeatherSearch />
        <div className='weather-container'>
          <div className='weather-title'>{`${this.state.data.name}, ${this.state.data.sys.country}`}</div>
          <div className='weather-status'>{`${this.handleWeatherStatus()}`}</div>
          <div className='weather-details'>
            <WeatherIcon />
            <WeatherTemperature
              indicator={this.state.indicator}
              handleIndicator={this.handleIndicator.bind(this)}
              {...this.state}
            />
          </div>
        </div>
      </div>
    );
  }

}

export default WeatherApp;
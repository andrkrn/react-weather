var WeatherTemperature = React.createClass({
  temperature: function() {
    switch(this.props.temperature) {
      case 'c':
        return this.tempCelcius() + "℃";
        break;
      case 'f':
        return (this.tempCelcius() * 9/5 + 32) + "℉";
        break;
    }
  },
  tempCelcius: function() {
    return parseInt(this.props.data.main.temp - 273);
  },
  handleTemperatureFormat: function() {
    var temp = (this.props.temperature === 'c') ? 'f' : 'c';
    this.props.handleTemperatureFormat(temp);
  },
  render: function() {
    return (
      <a onClick={this.handleTemperatureFormat}>{this.temperature()}</a>
    );
  }
});

var WeatherStatus = React.createClass({
  getInitialState: function() {
    return {data: {}};
  },
  updateWeatherData: function(data) {
    $.ajax({
      url: 'http://api.openweathermap.org/data/2.5/weather',
      data: {lat: data.latitude, lon: data.longitude, appid: 'f586d2e4af9ac5ca8a085413b9a42896'},
      dataType: 'json',
      type: 'GET',
      success: function(data) {
        this.setState({data: data});
      }.bind(this)
    })
  },
  weatherIcon: function() {
    var icon = "wi ";
    switch(this.state.data.weather[0].icon) {
      case "01d":
        icon += "wi-day-sunny";
        break;
      case "01n":
        icon += "wi-night-clear";
        break;
      case "02d":
        icon += "wi-day-cloudy";
        break;
      case "03d":
        icon += "wi-day-cloudy";
        break;
      case "03n":
        icon += "wi-night-cloudy";
        break;
      case "04d":
      case "04n":
        icon += "wi-cloudy";
        break;
      case "09d":
        icon += "wi-day-showers";
        break;
      case "09n":
        icon += "wi-night-showers";
        break;
      case "10d":
        icon += "wi-day-rain";
        break;
      case "10n":
        icon += "wi-night-rain";
        break;
      case "11d":
        icon += "wi-day-thunderstorm";
        break;
      case "11n":
        icon += "wi-night-thunderstorm";
        break;
      case "13d":
        icon += "wi-day-snow";
        break;
      case "13n":
        icon += "wi-night-snow";
        break;
      case "50d":
      case "50n":
        icon += "wi-smog";
        break;
    }
    return icon;
  },
  componentWillReceiveProps: function(Props) {
    this.updateWeatherData(Props.data);
  },
  render: function() {
    if (Object.keys(this.state.data).length === 0) {
      return (<div></div>);
    } else {
      return (
        <div className="weather-status">
          <h2>
            <i className={this.weatherIcon()}></i>
            <WeatherTemperature
              data={this.state.data}
              handleTemperatureFormat={this.props.handleTemperatureFormat}
              temperature={this.props.temperature} />
          </h2>
          <p>{this.state.data.name}, {this.state.data.sys.country}</p>
        </div>
      );
    }
  }
});

var WeatherSearch = React.createClass({
  handleSuggestSelect: function(suggest) {
    this.props.handleDataChange(suggest);
  },
  render: function() {
    return (
      <div className="weather-search">
        <Geosuggest
          onSuggestSelect={this.handleSuggestSelect}  />
      </div>
    );
  }
});

var WeatherApp = React.createClass({
  getInitialState: function() {
    return {
      data: {},
      temperature: 'c'
    };
  },
  componentDidMount: function() {
    $.ajax({
      url: 'https://freegeoip.net/json/?callback=?',
      dataType: 'json',
      type: 'GET',
      success: function(data) {
        this.setState({data: data});
      }.bind(this)
    })
  },
  handleDataChange: function(data) {
    this.setState({data: {
      latitude: data.location.lat,
      longitude: data.location.lng
    }});
  },
  handleTemperatureFormat: function(temp) {
    this.setState({temperature: temp});
  },
  render: function() {
    return (
      <div className="weather-app-container">
        <WeatherSearch handleDataChange={this.handleDataChange} />
        <div className="weather-app">
          <WeatherStatus
            data={this.state.data}
            handleTemperatureFormat={this.handleTemperatureFormat}
            temperature={this.state.temperature} />
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <WeatherApp />,
  document.getElementById('app')
);

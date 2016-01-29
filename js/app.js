var WeatherStatus = React.createClass({
  getInitialState: function() {
    return {data: {}};
  },
  tempCalcius: function() {
    return parseInt(this.state.data.main.temp - 273);
  },
  updateWeatherData: function(data) {
    $.ajax({
      url: 'http://api.openweathermap.org/data/2.5/weather',
      data: {lat: data.latitude, lon: data.longitude, appid: 'f586d2e4af9ac5ca8a085413b9a42896'},
      dataType: 'json',
      type: 'GET',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),

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
            {this.tempCalcius()} &#8451;
          </h2>
          <p>{this.state.data.name}, {this.state.data.sys.country}</p>
        </div>
      );
    }
  }
});

var WeatherSearch = React.createClass({
  render: function() {
    return (
      <div className="weather-search">
        <form>
          <input type="text" />
          <input type="submit" value="Search" />
        </form>
      </div>
    );
  }
});

var WeatherApp = React.createClass({
  getInitialState: function() {
    return {data: {}};
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
  render: function() {
    return (
      <div className="weather-app">
        <WeatherStatus data={this.state.data} />
      </div>
    );
  }
});

ReactDOM.render(
  <WeatherApp />,
  document.getElementById('app')
);

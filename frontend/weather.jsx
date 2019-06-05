import React from 'react';
import Forecast from './forecast';

export default class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fahrenheit: 0,
      celsius: 0,
      weatherDescription: null,
      icon: null,
      humidity: 0,
      high: 0,
      low: 0,
      windSpeed: 0,
      cloudiness: 0,
      forecasts: null
    };
    this.capitalizeFirstLetter = this.capitalizeFirstLetter.bind(this);
  }

  fetchWeatherData() {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.props.location}&appid=fba61597b693afd2b121ca0ad929d002&units=imperial`)
      .then(result => {
        return result.json();
      }).then(result => {
        this.setState({fahrenheit: Math.round(result.main.temp),
          celsius: Math.round((result.main.temp - 32)*5/9),
          weatherDescription: result.weather[0].description,
          icon: `http://openweathermap.org/img/w/${result.weather[0].icon}.png`,
          humidity: result.main.humidity,
          low: Math.round(result.main.temp_min),
          high: Math.round(result.main.temp_max),
          windSpeed: Math.round(result.wind.speed),
          cloudiness: result.clouds.all
        });
      });
  }

  fetchForecasts() {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${this.props.location}&appid=fba61597b693afd2b121ca0ad929d002&units=imperial`)
      .then(result => {
        return result.json();
      }).then(result => {
        let tenDayForecast = result.list.slice(0, 10);
        let formattedForecasts = tenDayForecast.map((obj, i) => {
          return(
            <Forecast key={i} time={obj.dt_txt} fahrenheit={Math.round(obj.main.temp)} description={obj.weather[0].main} icon={`http://openweathermap.org/img/w/${obj.weather[0].icon}.png`}/>
          );
        });
      this.setState({forecasts: formattedForecasts});
      })
  }

  componentDidMount() {
    this.fetchWeatherData();
    this.fetchForecasts();
  }

  capitalizeFirstLetter(str) {
    if (str !== null) return str[0].toUpperCase().concat(str.slice(1));
  }

  render() {
    return(
      <div>
        <h2>{this.props.location}</h2>
        <h3>{this.state.fahrenheit}&#176; F</h3>
        <h3>({this.state.celsius}&#176; C)</h3>
        <h3>{this.state.humidity}% humidity</h3>
        <h4>Low: {this.state.low}&#176; F; High: {this.state.high}&#176; F</h4>
        <h4>{this.capitalizeFirstLetter(this.state.weatherDescription)}</h4>
        <h4>{this.state.cloudiness}% cloudy with wind speeds at {this.state.windSpeed} mph.</h4>
        <img src={this.state.icon} alt=""/>
        <div>
          <h4>Forecast:</h4>
          {this.state.forecasts}
        </div>
      </div>
    )
  }
}
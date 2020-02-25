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
            <Forecast
              key={i}
              time={obj.dt_txt}
              fahrenheit={Math.round(obj.main.temp)}
              description={obj.weather[0].main}
              icon={`http://openweathermap.org/img/w/${obj.weather[0].icon}.png`}
            />
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
    if (this.state.forecasts === null) return(<div></div>);

    return(
      <div className="slds-card slds-p-around_small">
        <div id={this.props.location} >
          <div className="white-opaque-background slds-p-around_small">
            <div className="slds-grid">
              <div className="slds-col">
                <ul className="slds-list_horizontal slds-has-block-links_space">
                  <li>
                    <h2>{this.capitalizeFirstLetter(this.props.location)}</h2>
                  </li>
                  <li>
                    <img className="slds-col icon-weather" src={this.state.icon} alt="weather icon"/>
                  </li>
                </ul>
                <div className="slds-grid">
                  <h3 className="slds-col slds-size_3-of-12 slds-p-right_xsmall">{this.state.fahrenheit}&#176; F</h3>
                  <h5 className="slds-col">({this.state.celsius}&#176; C)</h5>
                </div>
              </div>
              <div className="slds-col slds-text-align_right">
                <h3>{this.capitalizeFirstLetter(this.state.weatherDescription)}</h3>
                <h4>Low: {this.state.low}&#176; F; High: {this.state.high}&#176; F</h4>
                <h4>{this.state.cloudiness}% cloudy with wind speeds of {this.state.windSpeed} mph.</h4>
                <h4>{this.state.humidity}% humidity</h4>
              </div>
            </div>
            <div className="slds-p-top_large slds-p-bottom_small">
              <h4>Forecast</h4>
            </div>
            <div className="slds-grid slds-gutters">
              {this.state.forecasts}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
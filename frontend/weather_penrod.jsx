import React from 'react';
import ReactDOM from 'react-dom';
import Weather from './weather';
import { DateTime } from 'luxon';

let locations = [
  'Milwaukee',
  'Minneapolis',
  'Chicago',
  'Dallas'
];

let date = DateTime.local().toLocaleString(DateTime.DATETIME_HUGE);

function formatWeather(locations) {
  let formattedWeather = locations.map((location, i) => {
    return(
      <Weather location={location} key={i}/>
    )
  });
  return formattedWeather;
}

function Root() {
  return(
    <div>
      <h1>Penrod Weather</h1>
      <p>A weather app for the fine folks at <a href="https://penrod.co">Penrod</a>.</p>
      <p>Checked on {date}.</p>
      {formatWeather(locations)}
      <footer>
        Made by David Anderson for Penrod. Weather data provided by <a href="https://openweathermap.org/">OpenWeatherMap</a>.
        <nav>
          <a href="https://http://davidanderson.nyc">Portfolio</a>
          <a href="https://www.linkedin.com/in/david-anderson-7bb543101/">LinkedIn</a>
          <a href="http://github.com/dlande000">Github</a>
        </nav>
      </footer>
    </div>
  )
}

document.addEventListener("DOMContentLoaded", () => {
	const root = document.getElementById("root");
	ReactDOM.render(<Root/>, root);
});
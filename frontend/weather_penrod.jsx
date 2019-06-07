import React from 'react';
import ReactDOM from 'react-dom';
import Weather from './weather';
import { DateTime } from 'luxon';

const locations = [
  'milwaukee',
  'minneapolis',
  'chicago',
  'dallas'
];

let date = DateTime.local().toLocaleString(DateTime.DATETIME_HUGE);

function formatWeather(locations) {
  let formattedWeather = locations.map((location, i) => {
    return(
      <Weather location={location} key={location}/>
    )
  });
  return formattedWeather;
}

function Root() {
  return(
    <div className="full-app">
      <div className="slds-p-top_x-large slds-p-bottom_large slds-grid">
        <div className="slds-col">
          <h1 className="slds-text-heading--large">PENROD WEATHER</h1>
        </div>
        <div className="slds-col slds-text-align_right">
          <p>A weather app for the fine folks at <a href="https://penrod.co">Penrod</a>.</p>
          <p>Updated at {date}.</p>
        </div>
      </div>
      {formatWeather(locations)}
      <footer className="slds-p-top_x-large slds-p-bottom_large">
        <div className="slds-align_absolute-center">
          <div className="slds-p-right_x-large">
            Made by David Anderson for Penrod.<br/>
            Weather data provided by OpenWeatherMap.
          </div>
          <ul className="slds-list_horizontal slds-has-block-links_space">
            <li><a href="https://http://davidanderson.nyc">Portfolio</a></li>
            <li><a href="https://www.linkedin.com/in/david-anderson-7bb543101/">LinkedIn</a></li>
            <li><a href="http://github.com/dlande000">GitHub</a></li>
            <li><a href="mailto:dlande000@gmail.com">Email</a></li>
          </ul>
        </div>
      </footer>
    </div>
  )
}

document.addEventListener("DOMContentLoaded", () => {
	const root = document.getElementById("root");
	ReactDOM.render(<Root/>, root);
});
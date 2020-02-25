import React from 'react';
import { DateTime } from 'luxon';

export default class Forecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formattedDate: null
    };
  }

  timeStringToArray(time) {
    let timeElements = [];
    const checkingChars = [" ", "-", ":"];
    let newTime = "";

    for (let i = 0; timeElements.length < 5; i++) {
      if (!checkingChars.includes(this.props.time[i])) {
        newTime += this.props.time[i];
      } else {
        timeElements.push(parseInt(newTime));
        newTime = "";
      }
    }
    
    return timeElements;
  }

  formatDateTime() {
    const dateArr = DateTime.local(...this.timeStringToArray(this.props.time)).toLocaleString(DateTime.DATETIME_MED).split(' ');
    const formattedDate = dateArr.slice(0, 2).concat(dateArr.slice(3)).join(' ');
    this.setState({ formattedDate });
  }

  componentDidMount() {
    this.formatDateTime();
  }

  render() {
    if (this.state.formattedDate === null) return(<div></div>);
    return(
      <div className="slds-col">
        <p>{this.state.formattedDate}</p>
        <p>{this.props.fahrenheit}&#176; F</p>
        <img className="icon-forecast" src={this.props.icon} alt={this.props.description} />
        <p>{this.props.description}</p>
      </div>
    )
  }
}
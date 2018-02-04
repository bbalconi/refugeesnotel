import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import Skycons from 'react-skycons'

export default class DayCard extends Component {
  constructor() {
    super()
    this.dayConverter = this.dayConverter.bind(this);
    this.iconRender = this.iconRender.bind(this);
    this.highLow = this.highLow.bind(this);
    this.precip = this.precip.bind(this);
  }

  dayConverter(day, index) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let d = new Date();
    let dayName = days[d.getDay() + index];
    return dayName
  }

  iconRender(input) {
    let icon = input.toUpperCase();
    if (icon === 'PARTLY-CLOUDY-DAY') {
      icon = 'PARTLY_CLOUDY_DAY'
    } else if (icon === 'PARTLY-CLOUDY-NIGHT') {
      icon = 'PARTLY_CLOUDY_NIGHT'
    } else if (icon === 'CLEAR-DAY') {
      icon = 'CLEAR_DAY'
    } else if (icon === 'CLEAR-NIGHT') {
      icon = 'CLEAR_NIGHT'
    }
    return (
      <Skycons
        style={{ maxWidth: 150, height: 75 }}
        color='black'
        icon={icon}
        autoplay={true}
      />
    )
  }

  precip(day){
    let probability = Math.floor(day.precipProbability*100); 
    if (day.precipType) {
      return <Text>Chance of {day.precipType}: {probability}%</Text>
    }
  }



  highLow(day) {
    let highTemp = day.apparentTemperatureHigh;
    let highRound = Math.round(highTemp);
    let lowTemp = day.apparentTemperatureLow;
    let lowRound = Math.round(lowTemp);
    return (
      <MaxMin>
        <Text>High: <b>{highRound}°F.</b><br/></Text>
        <Text>Low: <b>{lowRound}°F.</b><br/></Text>
        {this.precip(day)}
      </MaxMin>
    )
  }

  render() {
    return (
      <EachDay>
        <h3>{this.dayConverter(this.props.day, this.props.index)}</h3>
        {this.iconRender(this.props.day.icon)}
        {this.props.day.summary}
        {this.highLow(this.props.day)}
      </EachDay>
    );
  }
}




// ------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------


const EachDay = styled.div`
text-align: center;
background-color: #ffff;
height: 350px;
width: 135px;
margin-bottom: 5px;
margin-left: 5px;
margin-right: 5px;
padding: 1.5em;
border: 1px solid black;
border-radius: 5px;
`

const MaxMin = styled.div`
`

const Text = styled.p`
font-size: 1em;
color: green;

${props => props.bold && css`
font-weight: bold;`}
`
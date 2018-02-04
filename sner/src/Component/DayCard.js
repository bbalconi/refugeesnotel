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
        color=' #402924'
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
        <Title>{this.dayConverter(this.props.day, this.props.index)}</Title>
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
background: rgba(0, 0, 0, 0);
text-align: center;
height: auto;
width: 135px;
padding-bottom: 0px;
padding-top: 0px;
padding-left: 1.5em;
padding-right: 1.5em;
margin-left: 5px;
margin-right: 5px;
margin-bottom: 5px;
border: 1px solid #6228bf;
border-radius: 5px;
`

const MaxMin = styled.div`
`

const Title = styled.h2`
color: #336699`

const Text = styled.p`
font-size: 1em;
color: #336699;

${props => props.bold && css`
font-weight: bold;`}
`
import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import Skycons from 'react-skycons';
import '../weather-icons/css/weather-icons-wind.min.css';


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
  };

  dateConverter(day, index) {
    let d = new Date();
    let dd = d.getDate()+index;
    let mm = d.getMonth()+1;
    return `${mm}/${dd}`
  };

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
      return <Text chance>Chance of {day.precipType}: <b style={{color: '#336699'}}>{probability}%</b></Text>
    }
  }

  tempLowTime(seconds) {
    let duration = seconds * 1000;
    let minutes = parseInt((duration/(1000*60))%60, 10)
      , hours = parseInt((duration/(1000*60*60))%24, 10);
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;

    return `${hours}:${minutes}`;
  }

  highLow(day) {
    let highTemp = day.apparentTemperatureHigh;
    let highRound = Math.round(highTemp);
    let lowTemp = day.apparentTemperatureLow;
    let lowRound = Math.round(lowTemp);
    let windDirection = `wi wi-wind from-${day.windBearing}-deg`
    let windSpeed = Math.round(day.windSpeed);
    let windGust = Math.round(day.windGust);
    return (
      <MaxMin>
        <Text wind>
        <i className={windDirection} style={{fontSize: 36, color:'#ba7284'}}></i><br/>
          Wind speed: <b style={{color: '#ba7284'}}>{windSpeed} mph.</b><br/>
          Wind gusts: <b style={{color: '#ba7284'}}>{windGust} mph.</b>
        </Text>
        <Text hiLo>High: <b style={{color: '#336699'}}>{highRound}°F.</b><br/></Text>
        <Text hiLo>Low: <b style={{color: '#336699'}}>{lowRound}°F.</b><br/></Text>
        {this.precip(day)}
      </MaxMin>
    )
  }

  render() {
    return (
      <EachDay>
        <Title>{this.dayConverter(this.props.day, this.props.index)}</Title>
        <Title date>{this.dateConverter(this.props.day, this.props.index)}</Title>
        {this.iconRender(this.props.day.icon)}
        <Summary>{this.props.day.summary}</Summary>
        {this.highLow(this.props.day)}
      </EachDay>
    );
  }
}




// ------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------


const EachDay = styled.div`
background: rgba(156, 156, 145, 0.2);
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

const Summary = styled.p`
font-size: .9em;
margin-bottom: .5em;
margin-left: -12px;
margin-right: -12px;
font-weight: 525;`

const Title = styled.h2`
margin-top: .5em;
color: #336699;
margin-bottom: 0;

${props => props.date && css`
font-size: 1.15em;
margin-top: 0px;
margin-bottom: .5em;
color: black;`}`

const Text = styled.p`
font-size: 1em;
color: black;

${props => props.hiLo && css`
margin-top: 0px;
margin-bottom: 0px;`}

${props => props.wind && css`
margin-left: -12px;
margin-right: -12px;`}

${props => props.chance && css`
margin-top: 2px;
font-size: 1em;
margin-left: -12px;
margin-right: -12px;`}`
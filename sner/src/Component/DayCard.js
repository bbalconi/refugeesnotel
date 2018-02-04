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
    if (icon == 'PARTLY-CLOUDY-DAY') {
      icon = 'PARTLY_CLOUDY_DAY'
    } else if (icon == 'PARTLY-CLOUDY-NIGHT') {
      icon = 'PARTLY_CLOUDY_NIGHT'
    } else if (icon == 'CLEAR-DAY') {
      icon = 'CLEAR_DAY'
    } else if (icon == 'CLEAR-NIGHT') {
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
    let probability = day.precipProbability*100; 
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
        <Text>High: <Text bold>{highRound}°F.</Text><br/></Text>
        <Text>Low: <Text bold>{lowRound}°F.</Text><br/></Text>
        {this.precip(day)}
      </MaxMin>
    )
  }

  render() {
    return (
      <EachDay>
        {this.dayConverter(this.props.day, this.props.index)}
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
flex-direction: row;
flex-wrap: wrap;
margin-bottom: 5px;
margin-left: 5px;
margin-right: 5px;
padding: 1.5em;
`
const Delete = styled.button`
font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
font-weight: bold;
border-radius: 3px;
color: white;
width: 50px;
height: 35px;
background: #E3184F;
font-size: 1.25em;
border: 2px solid #E3184F;
`

const MaxMin = styled.div`
`

const Text = styled.text`
font-size: 1em;
color: green;

${props => props.bold && css`
font-weight: bold;`}
`

// dayGenerator(day, index) {
//   console.log(day)
//   let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//   let d = new Date();
//   let dayName = days[d.getDay()+index];
//   let icon = day.icon.toUpperCase();
//   if (icon == 'PARTLY-CLOUDY-DAY') {
//     icon = 'PARTLY_CLOUDY_DAY'
//   } else if (icon == 'PARTLY-CLOUDY-NIGHT') {
//     icon = 'PARTLY_CLOUDY_NIGHT'
//   };
//   return (
//     <EachDay>
//       {dayName}
//       <Skycons 
//       style={{maxWidth: 150, height: 75}}
//       color='black' 
//       icon={icon} 
//       autoplay={true}
//     />
//     <MaxMin>High of {day.apparentTemperatureHigh} at </MaxMin>
//     </EachDay>
//   )
// }
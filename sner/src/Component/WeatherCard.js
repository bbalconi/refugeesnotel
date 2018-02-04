import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Skycons from 'react-skycons';
import DayCard from './DayCard';
var axios = require('axios')

var WeatherCard = observer(class WeatherCard extends Component {
  constructor(){
    super()
    this.reverseGeocode = this.reverseGeocode.bind(this);
  }

  cardGenerator(location) {
    let card = location.locationObject;
    this.reverseGeocode(card.latitude, card.longitude)
    return (
      <LocationCard key={location.key}>
        This week in {card.latitude}, {card.longitude}: {card.daily.summary}
        {card.daily.data.map(this.dayGenerator, this)}
        <Delete onClick={() => this.deleteCard(location._id)}>X</Delete>
      </LocationCard>
    )
  }

  dayGenerator(day, index) {
    return (
      <DayCard
      day={day}
      index={index}/>
    )
  }

  reverseGeocode(lat, lng){
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat}%2C${lng}&language=en`).then((res) => {
      console.log(res);
    })
  }

  deleteCard(id){
    axios.post('/deleteCard', {id:id}).then((res) => {
      axios.get('/retrieveSavedLocations').then((res) => {
        this.props.snowStore.weather = res.data;
      })
    })
  }

  render() {
    let locationArray = this.props.snowStore.weather
    return (
      <div>
        {locationArray.map(this.cardGenerator, this)}
      </div>
    );
  }
})

// ------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------

const LocationCard = styled.div`
background-color: #ddd;
max-width: 1600px;
min-height: 400px;
margin-top: 8px;
margin-bottom: 8px;
margin-left: auto;
margin-right: auto;
padding: 1.5em;
display: flex;
`

const EachDay = styled.div`
background-color: #ffff;
height: 350px;
width: 250px;
flex-direction: row;
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

const MaxMin = styled.text`
font-size: 1em;
font-color: green;`

export default withRouter(inject('snowStore')(WeatherCard));

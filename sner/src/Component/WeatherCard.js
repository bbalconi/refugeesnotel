import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import DayCard from './DayCard';
var axios = require('axios')

var WeatherCard = observer(class WeatherCard extends Component {
  constructor() {
    super()
    this.reverseGeocode = this.reverseGeocode.bind(this);
    this.state = {
      location: null
    }
  }

  cardGenerator(location, index) {
    let card = location.locationObject;
    console.log('no infinite loop please')
    return (
      <LocationCard key={index}>
        This week in {this.state.location}: {card.daily.summary}
        {card.daily.data.map(this.dayGenerator, this)}
        <Delete onClick={() => this.deleteCard(location._id)}>X</Delete>
      </LocationCard>
    )}

  dayGenerator(day, key) {
    return (
      <DayCard
        day={day}
        key={key}
        index={key} />
    )
  }

  reverseGeocode(lat, lng) {
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat}%2C${lng}&language=en`).then((res) => {
        let geolocation = res.data.results["0"].formatted_address
    })
  }

  deleteCard(id) {
    axios.post('/deleteCard', { id: id }).then((res) => {
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



export default withRouter(inject('snowStore')(WeatherCard));

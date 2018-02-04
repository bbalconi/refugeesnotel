import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import DayCard from './DayCard';
var axios = require('axios')

var WeatherCard = observer(class WeatherCard extends Component {

  cardGenerator(location, index) {
    console.log(location)
    let card = location.locationObject;
    return (
      <LocationCard key={index}>
        <TopLine>
          <Delete onClick={() => this.deleteCard(location._id)}>X</Delete>
          <Location>{location.locationName}</Location>
        </TopLine>
        <Header>{card.daily.summary}</Header>
        <Days>{card.daily.data.map(this.dayGenerator, this)}
        </Days>
      </LocationCard>
    )
  }

  dayGenerator(day, key) {
    return (
      <DayCard
        day={day}
        key={key}
        index={key} />
    )
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
text-align: center;
background-color: #ddd;
max-width: 1600px;
min-height: 400px;
height: auto;
width: auto;
margin-top: 8px;
margin-bottom: 8px;
margin-left: auto;
margin-right: auto;
padding: 1.5em;
border: 1px solid black;
border-radius: 10px;
`

const TopLine = styled.div`
display: flex;
flex-direction: column;
align-items: center;`

const Location = styled.h1`
`

const Header = styled.h3`
`

const Days = styled.div`
display: flex;
flex-wrap: wrap;`

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
align-self: flex-end;
`



export default withRouter(inject('snowStore')(WeatherCard));

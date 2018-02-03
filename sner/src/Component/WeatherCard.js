import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import styled, { css } from 'styled-components';
var axios = require('axios')

var WeatherCard = observer(class WeatherCard extends Component {

  cardGenerator(location) {
    let card = location.locationObject;
    return (
      <LocationCard key={location.key}>{location._id}
        {card.daily.data.map(this.dayGenerator, this)}
        <Delete onClick={() => this.deleteCard(location._id)}>X</Delete>
      </LocationCard>
    )
  }

  dayGenerator(day, index) {
    console.log(day, index)
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let d = new Date();
    let dayName = days[d.getDay()+index];
    console.log(d.getDay()+index)
    return (
      <EachDay>
        {dayName}
      </EachDay>
    )
  }

  deleteCard(id){
    axios.post('/deleteCard', {id:id}).then((res) => {
      console.log(res);
      axios.get('/retrieveSavedLocations').then((res) => {
        console.log(res.data);
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
min-height: 200px;
margin-bottom: 15px;
margin-left: auto;
margin-right: auto;
padding: 1.5em;
display: flex;
`

const EachDay = styled.div`
background-color: #FFFF;
height: 150px;
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

export default withRouter(inject('snowStore')(WeatherCard));

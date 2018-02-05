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
        <TopLine><ButtonWrap>
          <Refresh onClick={() => this.refreshCard(location._id, card)}>
            <i className="material-icons" style={{color: 'white', fontWeight: 'bold', marginTop: 3}}>autorenew</i>
            </Refresh>
          <Delete onClick={() => this.deleteCard(location._id)}>X</Delete></ButtonWrap>
          <Location>{location.locationName}</Location>
        </TopLine>
        <Header>{card.daily.summary}</Header>
        <Days>
          {card.daily.data.map(this.dayGenerator, this)}
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

  refreshCard(id, card) {
    axios.post('/darthVader', {
        lat: card.latitude,
        lng: card.longitude
      }).then((res) => {
        axios.put('/updateCard', {
          _id: id,
          newData: res.data
        }).then((res) => {
          if (res.data === "Success") {
            axios.get('/retrieveSavedLocations').then((res) => {
              this.props.snowStore.weather = res.data;
            })
          }
        })
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
text-align: center;
background: rgba(116, 116, 116, 0.1);
max-width: 1600px;
min-height: 400px;
height: auto;
width: auto;
margin-top: 8px;
margin-bottom: 20px;
margin-left: auto;
margin-right: auto;
padding: .75em;
border: 1px solid #9a6ae6;
border-radius: 10px;
`

const ButtonWrap = styled.div`
display: flex;
flex-wrap: row;
align-self: flex-end;`

const TopLine = styled.div`
display: flex;
flex-direction: column;
align-items: center;`

const Location = styled.h1`
color: #323031;
margin-top: 0px;
margin-bottom: 0px;
`

const Header = styled.h3`
color: #323031;
margin-top: 0px;
`

const Days = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: flex-start;`

const Refresh = styled.button`
font-weight: bold;
border-radius: 3px;
color: white;
width: 50px;
height: 35px;
background: #54b7e0;
font-size: 1.25em;
border: 2px solid #54b7e0;
align-self: flex-end;
margin-right: 7px;
font-family: Font Awesome 5 Solid;
`

const Delete = styled.button`
font-weight: bold;
border-radius: 3px;
color: white;
width: 50px;
height: 35px;
background: #ba7284;
font-size: 1.25em;
border: 2px solid #ba7284;
align-self: flex-end;
`



export default withRouter(inject('snowStore')(WeatherCard));

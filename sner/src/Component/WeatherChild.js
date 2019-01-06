import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import DayCard from './DayCard';
var axios = require('axios')

var WeatherChild = observer(class WeatherCard extends Component {
  constructor() {
    super();
    this.updateLocationName = this.updateLocationName.bind(this);
    this.saveNewLocation = this.saveNewLocation.bind(this);
    this.minimize = this.minimize.bind(this);
    this.state = {
      locationName: ""
    }
  }

  editToggle(location) {
    location.isEditable = !location.isEditable;
  }

  dayGenerator(day, key) {
    return (
      <DayCard
        day={day}
        key={key}
        index={key} />
    )
  }

  saveNewLocation() {
    axios.put('/updateLocationName', {
      _id: this.props.locationProps._id,
      newLocationName: this.state.locationName
    }).then((res) => {
      axios.get('/retrieveSavedLocations').then((res) => {
        this.props.snowStore.weather = res.data
      }).then((res) => {
        console.log(this);

      })
    })
  }

  updateLocationName(e) {
    this.setState({
      locationName: e.target.value
    })
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

  minimize(){
    console.log('clickclack')
  }

  render() {
    let location = this.props.locationProps;
    let card = this.props.locationProps.locationObject
    if (location.isEditable === true) {
      return (
        <LocationCard>
          <TopLine><ButtonWrap>
            {/* <Refresh onClick={() => this.refreshCard(location._id, card)}>
              <i className="material-icons md-8" style={{ color: 'white', fontWeight: 'bold', marginTop: 3 }}>autorenew</i>
            </Refresh> */}
            <Delete onClick={() => this.deleteCard(location._id)}>X</Delete></ButtonWrap>
            <LocationTitle>
              <Input type="text" placeholder={location.locationName} onChange={this.updateLocationName} value={this.state.locationName} />
              <EditButton onClick={this.saveNewLocation}>
                <i className="material-icons" style={{ color: 'white', fontWeight: 'bold', marginTop: 3 }}>done</i>
              </EditButton></LocationTitle>
          </TopLine>
          <Header>{card.daily.summary}</Header>
          <Days>
            {card.daily.data.map(this.dayGenerator, this)}
          </Days>
        </LocationCard>
      )
    } else {
      return (
        <LocationCard>
          <TopLine><ButtonWrap>
            <Refresh onClick={() => this.minimize(location._id, card)}>
              <i className="material-icons" style={{ color: 'white', fontWeight: 'bold', marginTop: 3 }}>autorenew</i>
            </Refresh>
            <Delete onClick={() => this.deleteCard(location._id)}>X</Delete></ButtonWrap>
            <LocationTitle><Location>{location.locationName}</Location>
              <EditButton onClick={() => this.editToggle(location)}>
                <i className="material-icons" style={{ color: 'white', fontWeight: 'bold', marginTop: 3 }}>mode_edit</i>
              </EditButton></LocationTitle>
          </TopLine>
          <Header>{card.daily.summary}</Header>
          <Days>
            {card.daily.data.map(this.dayGenerator, this)}
          </Days>
        </LocationCard>
      )
    }
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

const EditButton = styled.button`
font-weight: bold;
border-radius: 3px;
color: white;
width: 50px;
height: 35px;
background: #9a6ae6;
font-size: 1.25em;
border: 2px solid #9a6ae6;
align-self: flex-end;
margin-right: 7px;
margin-left: 7px;
font-family: Font Awesome 5 Solid;
`

const LocationTitle = styled.div`
display:flex;
flex-mode: wrap;`

const Input = styled.input`
width: 500px;
`



export default withRouter(inject('snowStore')(WeatherChild));

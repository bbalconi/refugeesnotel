import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter, Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
var axios = require('axios')

var CardiB = observer(class CardiB extends Component {
  constructor() {
    super()
    this.getCoords = this.getCoords.bind(this);
    this.newState = this.newState.bind(this);
    this.sendData = this.sendData.bind(this);
    this.state = {
      lat: 0,
      lng: 0,
      latSend: 0,
      lngSend: 0,
    }
  }

  getCoords(e) {
    let latty = e.latLng.lat();
    let latRound = parseFloat(latty.toFixed(4));
    let longy = e.latLng.lng();
    let lngRound = parseFloat(longy.toFixed(4));
    this.setState({
      lat: latRound,
      lng: lngRound
    });
  }

  newState(){
    this.setState({
      latSend: this.state.lat,
      lngSend: this.state.lng
    });
  }

  sendData() {
      return new Promise((resolve, reject) => {
        axios.post('/darthVader', {
          lat: this.state.latSend,
          lng: this.state.lngSend
        }).then((res) => {
          console.log(res)
          resolve();
        })
      })
  }

  render() {
    return (
      <DailyCard>
        <Mappy
          containerElement={<div style={{ height: `800px` }} />}
          mapElement={<div style={{ height: `100%`, width: '100%' }} />}
          getCoords={this.getCoords}
          newState={this.newState}
          state={this.state}
        />
        <Text>{this.state.lat}          {this.state.lng}</Text><br/>
        <Text send>{this.state.latSend}          {this.state.lngSend}</Text>
        <DarkSkyButton onClick={this.sendData}>Generate Weather Data</DarkSkyButton>
      </DailyCard>
    );
  }
})

const Mappy = withGoogleMap(props =>
  <GoogleMap
    defaultZoom={10}
    defaultCenter={{ lat: 45.817348, lng: -110.929318 }}
    defaultMapTypeId={`terrain`}
    onMouseMove={(e) => props.getCoords(e)}
    onClick={() => props.newState()}
  >
  </GoogleMap>
);

const DailyCard = styled.div`
  background-color: #ddd;
  max-width: 1600px;
  min-height: 400px;
  margin-left: auto;
  margin-right: auto;
  padding: 1.5em;
`

const Text = styled.h1`
  color: red;
  
  ${props => props.send && css`
  color: blue;
`}`

const DarkSkyButton = styled.button`
`


export default withRouter(inject('snowStore')(CardiB));

import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter, Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

var CardiB = observer(class CardiB extends Component {
  constructor(){
    super()
    this.getCoords = this.getCoords.bind(this)
    this.state = {
      test: 'fuck?',
    }
  }

  getCoords(e){
    console.log('ran?')
    console.log(e)
  }

  render() {
    return (
      <DailyCard>
        <Mappy
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%`, width: '50%'}} />}
        />
        <MapGuide/>        
      </DailyCard>
    );
  }
})


const Mappy = withGoogleMap(props =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 45.817348, lng: -110.929318 }}
    onDragEnd={this.getCoords}
  >
  </GoogleMap>
);

const MapGuide = () => (
  <Text>WHAT UP</Text>
)

const DailyCard = styled.div`
  background-color: #ddd;
  max-width: 1600px;
  min-height: 400px;
  margin-left: auto;
  margin-right: auto;
  padding: 1.5em;
`

const Text = styled.h1`
  color: red`


export default withRouter(inject('snowStore')(CardiB));

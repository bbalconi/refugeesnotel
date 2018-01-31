import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter, Link } from 'react-router-dom';
import CardiB from '../Component/CardiB';
import styled, { css } from 'styled-components';
var axios = require('axios')

var Home = observer(class Home extends Component {

  componentDidMount() {
    axios.get('/skyWalker').then((res) => {
      this.props.snowStore.weather = res.data;
    })
  }

  render() {
    let snowAlert = this.props.snowStore.weather;
    if (snowAlert) {
      return (
        <div>
          {/* <Intro/> */}
          <CardiB/>
        </div>
      );
    } else {
      return (
        <div>
        </div>
      )
    }
  }
})

const Intro = () => (
  <Banner>
    <Title>LET IT FUCKIN' SNOW!</Title>
  </Banner>
)


const Banner = styled.div`
  background-image: url('/images/hyalite.jpeg');
  position: relative;
  min-height: 840px;
  width: 100%;
  height: auto;
  background-repeat: no-repeat;
  background-position: center;
  text-align: center;
  top: 0;
  left: 0; 
  padding: 0;
  `;

  const Title = styled.h1`
  font-family: 'Fjalla One', sans-serif;
  letter-spacing: 3px;
  font-size: 3.5em;
  color: #505D66;
  width: 100%;
  position: absolute;
  bottom: 0;
  top: 180px;`


export default withRouter(inject('snowStore')(Home));


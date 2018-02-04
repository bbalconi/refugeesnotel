import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import CardiB from '../Component/CardiB';
import WeatherCard from '../Component/WeatherCard';
import styled, { css } from 'styled-components';
var axios = require('axios')

var Home = observer(class Home extends Component {

  componentDidMount() {
    axios.get('/retrieveSavedLocations').then((res) => {
      console.log(res.data);
      this.props.snowStore.weather = res.data;
    })
  }

  render() {
      return (
        <Parent>
          <CardiB/>
          <WeatherCard/>
        </Parent>
      );
    }
  })

const Parent = styled.div`
font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
`

export default withRouter(inject('snowStore')(Home));


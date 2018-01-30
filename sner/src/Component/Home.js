import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter, Link } from 'react-router-dom';
import CardiB from '../Component/CardiB';
import styled, { css } from 'styled-components';
var axios = require('axios')

var Home = observer(class Home extends Component {

  componentDidMount() {
    axios.get('/skyWalker').then((res) => {
      console.log(res.data)
      this.props.snowStore.weather = res.data;
    })
  }

  render() {
    let snowAlert = this.props.snowStore.weather;
    if (snowAlert) {
      return (
        <div>
          <Banner/>
          <CardiB/>
          {this.props.snowStore.weather.daily.summary}
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

const Banner = styled.section`
  background-image: url('/images/hyalite.jpeg');
  position: relative
  display: block;
  margin: auto;
  min-height: 840px;
  width: 100%;
  height: auto;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  text-align: center; 
  padding: 0;
  `;

export default withRouter(inject('snowStore')(Home));


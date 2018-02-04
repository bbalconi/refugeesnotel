import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import CardiB from '../Component/CardiB';
import WeatherCard from '../Component/WeatherCard';
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
        <div>
          <CardiB/>
          <WeatherCard/>
        </div>
      );
    }
  })

export default withRouter(inject('snowStore')(Home));


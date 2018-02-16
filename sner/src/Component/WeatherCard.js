import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import WeatherChild from './WeatherChild';

var WeatherCard = observer(class WeatherCard extends Component {

  cardGenerator(locationProps, index) {
    return(<WeatherChild key={index} locationProps={locationProps}/>)
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

export default withRouter(inject('snowStore')(WeatherCard));

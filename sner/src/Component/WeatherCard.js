import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

var WeatherCard = observer(class WeatherCard extends Component {
  render() {
    console.log(this.props.snowStore);
    return (
      <div>Hiyeee!!!!!!</div>
    );
  }
})

export default withRouter(inject('snowStore')(WeatherCard));

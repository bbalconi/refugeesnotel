import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter, Link } from 'react-router-dom';
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
          {this.props.snowStore.weather.alerts["0"].description}
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

export default withRouter(inject('snowStore')(Home));


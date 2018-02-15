import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Main from '../Component/Main';
import styled from 'styled-components';
var axios = require('axios')

var Home = observer(class Home extends Component {

  componentWillMount() {
    return new Promise((resolve, reject) => {
      axios.get('/retrieveSavedLocations').then((res) => {
        this.props.snowStore.weather = res.data;
        this.props.snowStore.loaded = true;
      });
    });
  };

  render() {
    if (this.props.snowStore.loaded === true) {
    return (
      <Parent>
        <Main />
      </Parent>
    )} else {
      return(<div></div>)
    };
  };
});
const Parent = styled.div`
font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
`

export default withRouter(inject('snowStore')(Home));


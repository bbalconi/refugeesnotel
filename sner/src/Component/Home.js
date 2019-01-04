import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Main from '../Component/Main';
import styled, { css } from 'styled-components';
var axios = require('axios')

var Home = observer(class Home extends Component {

  componentWillMount() {
    return new Promise((resolve, reject) => {
      axios.get('/retrieveSavedLocations').then((res) => {
        let grabNew = res.data;
        grabNew.forEach(element => {
          let grabNewCoords = {
            lat: element.locationObject.latitude,
            lng: element.locationObject.longitude,
            id: element._id
          };
          axios.post('/darthVader', {
            lat: grabNewCoords.lat,
            lng: grabNewCoords.lng
          }).then((res)=>{
            axios.put('/updateCard', {
              _id: grabNewCoords.id,
              newData: res.data
            }).then((res) => {
              if (res.data === "Success") {
                axios.get('/retrieveSavedLocations').then((res) => {
                  this.props.snowStore.weather = res.data;
                  this.props.snowStore.loaded = true;
                })
              }
            })
          })
        });
        // this.props.snowStore.weather = res.data;
        // this.props.snowStore.loaded = true;
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
      return(<Parent primary>
        <Loading src='./Spinner-4.3s-171px.gif'/>
        </Parent>)
    };
  };
});

const Parent = styled.div`
font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
${props => props.primary && css`
  height: 100vh;
`}`

const Loading = styled.img`
display: block;
margin-left: auto;
margin-right: auto;
margin-top: 15%;
width: 7.5%;`


export default withRouter(inject('snowStore')(Home));

